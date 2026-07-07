#!/usr/bin/env python3
"""
generar_audio_edgetts.py
------------------------
Turn the phrase list into 88 Rioplatense MP3s using Microsoft's free neural
voices (via the open-source `edge-tts`), then (optionally) embed them straight
into the lesson page so it works OFFLINE and IDENTICALLY on every device
-- including GrapheneOS phones with no TTS engine.

Microsoft has actual URUGUAY voices:
    es-UY-ValentinaNeural   (female)   <- default
    es-UY-MateoNeural       (male)
(Argentina also exists: es-AR-ElenaNeural / es-AR-TomasNeural.)

NOTE ON YOUR STACK: edge-tts uses Microsoft's *online* Edge voice service.
It's free with no API key, but it does contact Microsoft while generating
(one-time). After that the audio is local forever; nothing phones home when
the page is used. If you'd rather stay fully FOSS/offline end-to-end, use the
Piper script instead (generar_audio_piper.py).

SETUP (one time):
    python3 -m pip install --user edge-tts

RUN:
    python3 generar_audio_edgetts.py
        -> writes ./audio/<slug>.mp3  (drop this folder next to the HTML and host it)

    python3 generar_audio_edgetts.py --embed
        -> also writes Lecciones_Rioplatense_con_audio.html with the clips baked in
"""

import asyncio, base64, csv, json, re, sys
from pathlib import Path

VOICE      = "es-UY-ValentinaNeural"   # swap to es-UY-MateoNeural for the male voice
CSV_PATH   = Path("lista_de_grabacion.csv")
OUT_DIR    = Path("audio")
HTML_IN    = Path("Lecciones_Rioplatense.html")
HTML_OUT   = Path("Lecciones_Rioplatense_con_audio.html")

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts not installed. Run:  python3 -m pip install --user edge-tts")


def tts_text(display: str) -> str:
    """The page speaks the phrase minus the trailing '…' placeholder."""
    return display.replace("…", "").strip()


def read_rows():
    if not CSV_PATH.exists():
        sys.exit(f"Missing {CSV_PATH} -- put this script next to the CSV.")
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


async def synth_one(slug: str, text: str, path: Path):
    communicate = edge_tts.Communicate(text, voice=VOICE)
    await communicate.save(str(path))


async def main():
    rows = read_rows()
    OUT_DIR.mkdir(exist_ok=True)
    print(f"Voice: {VOICE}   Phrases: {len(rows)}\n")
    for i, r in enumerate(rows, 1):
        slug = r["slug"]
        text = tts_text(r["spanish"])
        path = OUT_DIR / f"{slug}.mp3"
        try:
            await synth_one(slug, text, path)
            print(f"  [{i:>2}/{len(rows)}] {slug:<22} “{text}”")
        except Exception as e:
            print(f"  [{i:>2}/{len(rows)}] {slug:<22} FAILED: {e}")
        await asyncio.sleep(0.15)  # be polite to the free service
    print(f"\nDone -> {OUT_DIR}/")

    if "--embed" in sys.argv:
        embed_into_html()


def embed_into_html():
    if not HTML_IN.exists():
        sys.exit(f"Can't embed: {HTML_IN} not found in this folder.")
    audio_map = {}
    for mp3 in sorted(OUT_DIR.glob("*.mp3")):
        b64 = base64.b64encode(mp3.read_bytes()).decode("ascii")
        audio_map[mp3.stem] = f"data:audio/mpeg;base64,{b64}"
    html = HTML_IN.read_text(encoding="utf-8")
    needle = "const AUDIO = {};"
    if needle not in html:
        sys.exit("Couldn't find the AUDIO placeholder in the HTML (was it edited?).")
    html = html.replace(needle, "const AUDIO = " + json.dumps(audio_map, ensure_ascii=False) + ";")
    HTML_OUT.write_text(html, encoding="utf-8")
    mb = HTML_OUT.stat().st_size / 1e6
    print(f"Embedded {len(audio_map)} clips -> {HTML_OUT}  ({mb:.1f} MB, fully self-contained)")


if __name__ == "__main__":
    asyncio.run(main())
