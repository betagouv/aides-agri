#!/usr/bin/env bash

set -e

paths=$(curl -s https://echanges.dila.gouv.fr/OPENDATA/JORFSIMPLE/ |egrep -o "JORFSIMPLE_`date +'%Y%m%d'`-[0-9]{6}\.tar\.gz")

targetdir="/tmp/jorf"

mkdir -p "$targetdir"

for path in $paths; do
  target="$targetdir/$path"
  if [[ ! -f "$target" ]]; then
    echo "Téléchargement de $path..."
    curl -s -o "$target" "https://echanges.dila.gouv.fr/OPENDATA/JORFSIMPLE/$path"
    tar xf "$target" -C "$targetdir"
    echo "OK."
  fi
done

IFS=" " read -ra ADDR <<< "$JORF_SEARCH_TERMS"
for term in "${ADDR[@]}"; do
  grep -Iirn "$term" "$targetdir"
done
