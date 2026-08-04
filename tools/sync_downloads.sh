#!/usr/bin/env bash
# sync_downloads.sh — move files handed over (they land in ~/Downloads) into the repo.
#   index.html + lista_de_grabacion.csv  -> repo root
#   *.py scripts + *.md docs             -> tools/
# Anything not currently in Downloads is skipped. Run from anywhere:
#   bash tools/sync_downloads.sh
set -uo pipefail

DL="${DOWNLOADS:-$HOME/Downloads}"

# anchor to the repo root from the script's own location (works from tools/ or root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ "$(basename "$SCRIPT_DIR")" == "tools" ]]; then
  REPO="$(dirname "$SCRIPT_DIR")"
else
  REPO="$SCRIPT_DIR"
fi

mkdir -p "$REPO/tools" "$REPO/audio"

moved=0; skipped=0

rel() { local p="${1#$REPO}"; p="${p#/}"; [[ -z "$p" ]] && p="(root)"; echo "$p"; }

move_file() {  # $1 = filename in Downloads, $2 = destination dir
  local name="$1" destdir="$2"
  if [[ -f "$DL/$name" ]]; then
    mv -f "$DL/$name" "$destdir/$name"
    printf '  moved   %-28s -> %s/\n' "$name" "$(rel "$destdir")"
    moved=$((moved+1))
  else
    printf '  (skip)  %-28s not in Downloads\n' "$name"
    skipped=$((skipped+1))
  fi
}

echo "Repo: $REPO"
echo "From: $DL"
echo

# root-level files
move_file "index.html"               "$REPO"
move_file "lista_de_grabacion.csv"   "$REPO"

# tools/ files
move_file "generar_audio_edgetts.py" "$REPO/tools"
move_file "generar_audio_piper.py"   "$REPO/tools"
move_file "PROJECT_NOTES.md"         "$REPO/tools"
move_file "AUDIO_PIPELINE.md"        "$REPO/tools"
move_file "sync_downloads.sh"        "$REPO/tools"   # move a fresh copy of me, if present

# keep tools/ CSV copy in sync with the root one
[[ -f "$REPO/lista_de_grabacion.csv" ]] && cp -f "$REPO/lista_de_grabacion.csv" "$REPO/tools/lista_de_grabacion.csv"

echo
echo "Done. Moved $moved, skipped $skipped."
echo
echo "Next:"
echo "  source ~/tts-venv/bin/activate && python3 tools/generar_audio_edgetts.py && deactivate"
echo "  git add -A && git commit -m 'Update lessons' && git push"
