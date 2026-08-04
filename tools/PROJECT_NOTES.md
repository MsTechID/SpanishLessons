# Family Spanish Lessons — Project Notes

Interactive single-page website teaching beginner **Rioplatense (Uruguayan) Spanish**
to family, under the **Tardis Software** brand.

**Live:** https://mstechid.github.io/SpanishLessons/

---

## What it is

A single `index.html` with **six lessons** across tabs (numbered 1–6). Every Spanish word, phrase, and title is a
clickable audio button; tapping opens a small popover player with **play/pause,
speed (0.6 / 0.8 / 1×), and volume**. Audio plays a recorded clip when one exists,
otherwise falls back to the device's Spanish voice.

Current tabs:
- **01 Lo básico** — greetings, intro, voseo, café, directions, vowels
- **02 Números y plata** — numbers 0–100, prices, money, shopping
- **03 Comida y viaje** — restaurant, specialties, around town, practice dialogue
- **04 Verbos** — five core verbs, tener idioms, "vamos a", sentence patterns, word bank
- **05 Repaso** — game-day review (solo): 5 games + Jeopardy + cumulative trip self-test
- **06 La hora** — time/hours cheat sheet + "Ponte a prueba" self-test

Clip count: **279** MP3s in `audio/`.

## Design

Palette lifted from the original lesson sheets: deep teal-green `#0E5C56`
(structure), terracotta `#C9682B` ("tap to hear" — underlines, play button,
active state), cream `#F4ECE1` page, white cards, Calibri throughout. Small
mate-gourd logo mark. No Google Fonts / external calls (FOSS-friendly).

## Interactive features

- **Audio popover player** — per phrase; play/pause, 3 speeds, volume. Recorded
  audio keeps natural pitch when slowed.
- **Voz y sonido panel** — pick the device's best Spanish voice; set default speed;
  download the recording-list CSV; per-device voice-setup help.
- **Quiz mode** — floating "Quiz me" toggle (bottom-right, scrolls with page).
  Hides every English translation behind a per-row "Show answer"; Spanish + audio
  stay live. Re-entering quiz mode re-hides everything for a fresh pass.
- **Self-test (Lesson 6, "Ponte a prueba")** — reverse recall: English prompt
  shows, Spanish answer hidden under "Show answer"; reveal to check, `↺` to
  re-cover and drill again. Revealed Spanish is clickable audio.

## Content formats (render types in index.html)

`rows` (phrase↔English, quiz-aware), `nums` (number tiles), `vowels` (sound-first:
glyph → sound → example, each clickable), `voseo`, `aside` (callouts, optional
clickable chips), `dialogue` (two-speaker, quiz-aware, full-line audio), `turno`
(fill-in template with highlighted slots), `verbs` (conjugation cards: infinitive,
yo, vos, example), `patterns` (sentence builders with slots + clickable example),
`wordbank` (clickable pill chips), `selftest` (reverse-recall drill; prompts can be audio via `pSay`), `hw` (homework).

## Audio (see AUDIO_PIPELINE.md for detail)

- Generated with **edge-tts**, voice **es-UY-ValentinaNeural** (Uruguay).
- Confirmed: this voice does the Rioplatense **sheísmo** (ll/y → "sh").
- Vowel-sound clips for `o`/`u` are synthesized from padded text (`o.` / `u.`) so
  the single vowel doesn't clip; filenames stay `o.mp3` / `u.mp3`.
- Script: `tools/generar_audio_edgetts.py` — **path-anchored** (finds the repo's
  `audio/` and CSV no matter where it's launched) and **resumable** (skips clips
  already made; only fills gaps). `--force` regenerates all; `--embed` bakes clips
  into a single self-contained HTML.

## Deployment

- Local repo: `~/Documents/Projects/SpanishLessons` (cloned from GitHub).
- `index.html` = the page; `audio/` = clips; `tools/` = scripts + CSV + docs.
- Remote uses **SSH**: `git@github.com:MsTechID/SpanishLessons.git`.
- Edited in **VSCodium** (apt-based, telemetry-free).
- GitHub Pages auto-rebuilds on push.

## Update loop (adding/changing lessons)

1. Edit `index.html` (content lives in JS data objects: `LESSON1…LESSON6`,
   `VOWELS`, `HEADING_AUDIO`).
2. Copy the new `index.html` and `lista_de_grabacion.csv` into the repo (the
   generator script does NOT move these — it only reads the CSV and writes mp3s).
3. Run `python3 tools/generar_audio_edgetts.py` (resumable → only new clips).
4. Refresh `tools/PROJECT_NOTES.md` and `tools/AUDIO_PIPELINE.md` to match.
5. `git add -A && git commit && git push` — Pages redeploys.

GitHub is case-sensitive: keep clip filenames lowercase to match slugs.

## Repo layout

```
SpanishLessons/
├── index.html                     # the lesson site
├── lista_de_grabacion.csv         # phrase list the generator reads (repo root)
├── audio/                         # 252 MP3 clips, <slug>.mp3
└── tools/
    ├── generar_audio_edgetts.py   # path-anchored, resumable generator
    ├── generar_audio_piper.py     # fully-offline FOSS alternative (Piper)
    ├── lista_de_grabacion.csv     # copy for convenience
    ├── PROJECT_NOTES.md           # this file
    └── AUDIO_PIPELINE.md
```

## Open threads

- **Host guide** (answer keys + curveballs for the live Meet) is kept OFF the
  public site by design — it lives as a separate printable (`Leccion5_Guia_del_Anfitrion.docx`),
  not in the published repo.
- A few verb *vos* forms (`querés`, `tenés`) reuse the `¿Querés?` / `¿Tenés?`
  question clips (same word, question intonation) — fine, but could get their own
  flat-intonation clips if desired.

## Context

FOSS-first household; de-Googles / de-Microsofts where practical. Ubuntu 22.04
(HP Z2 Tower) + GrapheneOS. Instructional designer by trade. Planning a 2027
relocation to Piriápolis, Uruguay — hence the Rioplatense focus.
