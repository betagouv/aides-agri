#!/usr/bin/env bash

set -e

# look for today's JORF URLs
paths=$(curl -s https://echanges.dila.gouv.fr/OPENDATA/JORFSIMPLE/ |egrep -o "JORFSIMPLE_`date +'%Y%m%d'`-[0-9]{6}\.tar\.gz")

targetdir="/tmp/jorf"

mkdir -p "$targetdir"

# Download today's first one only
for path in $paths; do
  target="$targetdir/$path"
  if [[ ! -f "$target" ]]; then
    echo "Téléchargement de $path..."
    curl -s -o "$target" "https://echanges.dila.gouv.fr/OPENDATA/JORFSIMPLE/$path"
    tar xf "$target" -C "$targetdir"
    echo "OK."
  fi
  break
done


# search for given in summary files only
shopt -s globstar
IFS=" " read -ra ADDR <<< "$JORF_SEARCH_TERMS"
for term in "${ADDR[@]}"; do
  echo "============= $term ================"
  grep -i --no-filename "$term" $targetdir/**/JORFCONT*.xml |grep -v "<TITRE_TM>" || true
done
