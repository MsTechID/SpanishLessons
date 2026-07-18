#!/usr/bin/env python3
"""
generar_audio_edgetts.py  (resumable, path-anchored)
----------------------------------------------------
Generate Rioplatense MP3s from lista_de_grabacion.csv using Microsoft's free
neural voices via `edge-tts`, then optionally embed them into index.html.

Voice: es-UY-ValentinaNeural  (Uruguay).  Male: es-UY-MateoNeural.

FIX vs. earlier versions: this script now finds the repo's audio/ and CSV
regardless of the folder you launch it from (root OR tools/). So the "skip
what's already done" logic actually works -- re-runs only fill in missing clips.

SETUP:  python3 -m pip install --user edge-tts     (or use a venv)
RUN:    python3 tools/generar_audio_edgetts.py          -> audio/<slug>.mp3
        python3 tools/generar_audio_edgetts.py --embed  -> also bakes into HTML
        python3 tools/generar_audio_edgetts.py --force  -> regenerate everything
"""

import asyncio, base64, csv, json, socket, sys
from pathlib import Path

VOICE       = "es-UY-ValentinaNeural"   # or es-UY-MateoNeural
HOST        = "speech.platform.bing.com"
MAX_RETRIES = 4
RETRY_SLEEP = 2.0

# --- anchor all paths to the repo root, wherever we're launched from ---
SCRIPT_DIR = Path(__file__).resolve().parent
REPO = SCRIPT_DIR.parent if SCRIPT_DIR.name == "tools" else SCRIPT_DIR
CSV_PATH = REPO / "lista_de_grabacion.csv"
OUT_DIR  = REPO / "audio"
HTML_IN  = REPO / "index.html"
HTML_OUT = REPO / "index_con_audio.html"

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts not installed. Run:  python3 -m pip install --user edge-tts")


def tts_text(display: str) -> str:
    return display.replace("\u2026", "").strip()   # drop trailing ellipsis


def read_rows():
    if not CSV_PATH.exists():
        sys.exit(f"Missing {CSV_PATH}")
    with CSV_PATH.open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def preflight():
    try:
        socket.getaddrinfo(HOST, 443)
    except socket.gaierror:
        sys.exit(
            f"\nDNS can't resolve {HOST} -- name-resolution problem, not the script.\n"
            "  * VPN / NetShield / DNS blocklist may drop Microsoft domains -- toggle off and retry.\n"
            "  * Relink resolver:\n"
            "      sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf\n"
            "      sudo systemctl restart systemd-resolved\n"
            "  * Or use generar_audio_piper.py (fully offline).\n"
        )


async def synth(text, path):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            await edge_tts.Communicate(text, voice=VOICE).save(str(path))
            return True, ""
        except Exception as e:
            if attempt < MAX_RETRIES:
                await asyncio.sleep(RETRY_SLEEP * attempt)
            else:
                if path.exists() and path.stat().st_size == 0:
                    path.unlink(missing_ok=True)
                return False, str(e)


async def main():
    rows = read_rows()
    OUT_DIR.mkdir(exist_ok=True)
    preflight()
    force = "--force" in sys.argv
    print(f"Repo:  {REPO}")
    print(f"Voice: {VOICE}   Phrases: {len(rows)}"
          + ("   (--force: regenerating all)" if force else "   (resumable -- skips existing)") + "\n")

    done = skipped = failed = 0
    fails = []
    for i, r in enumerate(rows, 1):
        slug, text = r["slug"], tts_text(r["spanish"])
        path = OUT_DIR / f"{slug}.mp3"
        if not force and path.exists() and path.stat().st_size > 0:
            skipped += 1
            continue
        ok, err = await synth(text, path)
        if ok:
            done += 1
            print(f"  [{i:>3}/{len(rows)}] {slug:<28} \u201c{text}\u201d")
        else:
            failed += 1; fails.append(slug)
            print(f"  [{i:>3}/{len(rows)}] {slug:<28} FAILED: {err}")
        await asyncio.sleep(0.15)

    print(f"\nNew: {done}   Already had: {skipped}   Failed: {failed}")
    if fails:
        print("Failed (re-run to retry just these):", ", ".join(fails))
    else:
        print(f"All {len(rows)} clips present in {OUT_DIR}  \u2713")

    if "--embed" in sys.argv:
        embed()


def embed():
    if not HTML_IN.exists():
        sys.exit(f"Can't embed: {HTML_IN} not found.")
    audio_map = {}
    for mp3 in sorted(OUT_DIR.glob("*.mp3")):
        if mp3.stat().st_size == 0:
            continue
        b64 = base64.b64encode(mp3.read_bytes()).decode("ascii")
        audio_map[mp3.stem] = f"data:audio/mpeg;base64,{b64}"
    html = HTML_IN.read_text(encoding="utf-8")
    if "const AUDIO = {};" not in html:
        sys.exit("Couldn't find the AUDIO placeholder in index.html.")
    html = html.replace("const AUDIO = {};", "const AUDIO = " + json.dumps(audio_map, ensure_ascii=False) + ";")
    HTML_OUT.write_text(html, encoding="utf-8")
    print(f"Embedded {len(audio_map)} clips -> {HTML_OUT}  ({HTML_OUT.stat().st_size/1e6:.1f} MB)")


if __name__ == "__main__":
    asyncio.run(main())
