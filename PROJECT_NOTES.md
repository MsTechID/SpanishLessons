# Family Spanish Lessons — Project Notes

Interactive single-page website teaching beginner **Rioplatense (Uruguayan) Spanish**
to family, under the **Tardis Software** brand.

**Live:** https://mstechid.github.io/SpanishLessons/

---

## What it is

Two lessons — (1) greetings & everyday basics, (2) numbers, money & shopping —
faithful to two source `.docx` review sheets, including English translations and
Uruguayan-usage notes (voseo, sheísmo, *la plata*, *la feria*, etc.). Every bold
Spanish word/phrase is clickable and opens a small popover audio player with
**play/pause, speed (0.6 / 0.8 / 1×), and volume** controls.

## Design

Palette matches the source sheets:

- Deep teal-green `#0E5C56` — structure (headings, tabs, section marks)
- Terracotta `#C9682B` — the "tap to hear" interaction color
- Cream `#F4ECE1` background, white cards, Calibri throughout
- Small mate-gourd logo mark

(An earlier blue/gold "Uruguayan flag" version was scrapped because it didn't
match the existing lesson materials.)

## How the audio works

Each phrase has a stable **slug** (e.g. `¿Cómo andás?` → `como-andas`). The page
plays a recorded clip if one exists, otherwise falls back to the device's Web
Speech voice. The player status line shows **"🎙 Tu grabación"** when a real clip
is playing.

- Audio generated with **edge-tts** (free Microsoft neural voices,
  `es-UY-ValentinaNeural` — an actual Uruguay voice).
- `generar_audio_edgetts.py` reads `lista_de_grabacion.csv` (88 phrases) and
  writes `audio/<slug>.mp3`. Run with `--embed` to bake clips into a single
  self-contained HTML instead.
- `generar_audio_piper.py` is a fully-FOSS / offline alternative
  (`es_AR-daniela-high`, Argentine — no Uruguay voice, and sheísmo not guaranteed).

**Key decision:** using the **unembedded page + `audio/` folder** (not the
single embedded file), specifically so lessons and clips can be expanded
incrementally.

## Deployment setup

- Local git repo: `~/Documents/Projects/SpanishLessons` (cloned from GitHub)
- `index.html` = the unembedded page; `audio/` = 88 MP3 clips
- Editing in **VSCodium** (apt-based, telemetry-free; Snap VS Code was removed)
- **SSH key auth** set up and working (`ssh -T git@github.com` succeeds)
- Remote uses SSH: `git@github.com:mstechid/SpanishLessons.git`
- GitHub Pages auto-rebuilds on push

## Expansion loop

1. Add phrases to `index.html`.
2. Download the updated CSV from the in-page button (Voz y sonido → Descargar
   lista de grabación), or reuse `lista_de_grabacion.csv`.
3. Rerun `generar_audio_edgetts.py` to generate new `audio/<slug>.mp3` clips.
4. Commit + push in VSCodium (Source Control → Commit → Sync Changes).

Phrases without a clip yet fall back to the device voice until one is added.
GitHub is case-sensitive: keep clip filenames lowercase to match the slugs.

## Repo layout (intended)

```
SpanishLessons/
├── index.html                     # the lesson site (unembedded)
├── audio/                         # 88 MP3 clips, named <slug>.mp3
└── tools/                         # not published; rides along in the repo
    ├── generar_audio_edgetts.py
    ├── generar_audio_piper.py
    ├── lista_de_grabacion.csv
    └── PROJECT_NOTES.md           # this file
```

## Regenerating audio — quick reference

```bash
# one-time install (throwaway venv keeps system Python clean)
python3 -m venv ~/tts-venv
source ~/tts-venv/bin/activate
pip install edge-tts

# from the folder containing lista_de_grabacion.csv
python3 generar_audio_edgetts.py            # -> audio/<slug>.mp3
# python3 generar_audio_edgetts.py --embed  # -> single self-contained HTML

deactivate   # done; audio/ is written and the venv can be deleted
```

Note: edge-tts uses Microsoft's online voice service (free, no API key) *during
generation only*; the resulting MP3s are local and offline afterward. DNS/VPN
flakiness can interrupt a run — just rerun; it regenerates missing clips.

## Context

FOSS-first; de-Googles / de-Microsofts where practical. Ubuntu 22.04 (HP Z2
Tower) + GrapheneOS. Instructional designer by trade. Planning a 2027 relocation
to Piriápolis, Uruguay — hence the Rioplatense focus.
