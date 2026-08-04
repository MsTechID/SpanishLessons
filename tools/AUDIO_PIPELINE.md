# Audio Pipeline — how the Rioplatense clips are made

How the `audio/*.mp3` files are generated, and how to regenerate or extend them.

## Method

- **Engine:** [`edge-tts`](https://pypi.org/project/edge-tts/) — open-source Python
  package using Microsoft's neural voices for free (no API key, no account).
- **Voice:** `es-UY-ValentinaNeural` — a genuine **Uruguay** female voice.
  Male alternative: `es-UY-MateoNeural`. (Confirmed: does the Rioplatense
  **sheísmo**, ll/y → "sh".)
- **Input:** `lista_de_grabacion.csv` at the repo root. Columns:
  `slug, filename, spanish, english`. The `spanish` column holds the **spoken**
  text (already stripped of ornamental "…"); `slug` is the lookup key / filename.
- **Output:** `audio/<slug>.mp3`, one per phrase (currently 279).

## Data flow

```
lista_de_grabacion.csv  (spoken text + slug)
        │
        ▼
tools/generar_audio_edgetts.py  ──▶  edge-tts (Valentina, online)  ──▶  audio/<slug>.mp3
        │
        └─(optional --embed)──▶  index_con_audio.html  (single self-contained file)
```

The website plays `audio/<slug>.mp3` when present, else falls back to the device's
speech voice. Keep filenames lowercase — GitHub Pages is case-sensitive.

## Key behaviours of the current script

`tools/generar_audio_edgetts.py`:

- **Path-anchored.** Resolves the repo's `audio/`, `lista_de_grabacion.csv`, and
  `index.html` from the script's own location (works whether launched from the
  repo root or from `tools/`). This is the fix for the old "regenerates everything
  every run" bug — it now reliably finds existing clips.
- **Resumable.** Skips any `<slug>.mp3` that already exists and is non-empty;
  prints `New: N  Already had: M  Failed: K`. Run with `--force` to rebuild all.
- **Retries + DNS preflight.** Checks `speech.platform.bing.com` resolves before
  starting (VPN/NetShield/DNS is the usual failure), and retries transient errors.
- **`--embed`.** Base64-bakes every clip into `index_con_audio.html` (a portable,
  offline single file) by replacing the `const AUDIO = {};` placeholder.
- **Does NOT move `index.html` or the CSV.** It only *reads* the CSV (and reads
  `index.html` only under `--embed`) and *writes* the mp3s. Copying the latest
  `index.html` / CSV into the repo is a separate manual `cp` step.

### The o/u vowel note
Single vowel letters synthesize cleanly except `o`/`u`, which clip. Their CSV
`spanish` text is padded to `o.` / `u.` (fuller vowel) while `slug`/filename stay
`o` / `u`. To re-render after changing them, delete `audio/o.mp3 audio/u.mp3`
first (resumable would otherwise skip them), or run with `--force`.

## Run it

```bash
# one-time install (throwaway venv keeps system Python clean)
python3 -m venv ~/tts-venv
source ~/tts-venv/bin/activate
pip install edge-tts

# from the repo root
python3 tools/generar_audio_edgetts.py            # only new clips
# python3 tools/generar_audio_edgetts.py --force  # rebuild everything
# python3 tools/generar_audio_edgetts.py --embed  # also make the baked single file

deactivate
```

### If it fails on DNS
- Toggle off the VPN / its blocklist (NetShield) and rerun, **or**
- Relink the resolver:
  ```bash
  sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
  sudo systemctl restart systemd-resolved
  ```
- **or** use `tools/generar_audio_piper.py` (fully offline, Argentine voice).

## Regenerate after adding phrases

1. Add phrases in `index.html` (JS data objects).
2. Update `lista_de_grabacion.csv` — download the fresh one from the in-page
   button (Voz y sonido → Descargar lista de grabación), or use the copy provided.
3. Copy the new `index.html` and CSV into the repo.
4. Run the generator (resumable → only new clips).
5. Refresh PROJECT_NOTES.md and this file, then commit + push.

## Change the voice
Edit the `VOICE` constant at the top of the script:
```python
VOICE = "es-UY-MateoNeural"   # male Uruguay voice
```
Generate into a separate folder (or use `--force`) if comparing without overwriting.
