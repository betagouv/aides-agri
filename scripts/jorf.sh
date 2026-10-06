#!/usr/bin/env bash

set -e

# look for today's JORF URLs
for_date=$(date +'%Y%m%d')
paths=$(curl -s https://echanges.dila.gouv.fr/OPENDATA/JORFSIMPLE/ |egrep -o "JORFSIMPLE_$for_date-[0-9]{6}\.tar\.gz")

downloaddir="/tmp/jorf"
outputdir="/tmp/jorf-results"

mkdir -p "$downloaddir" "$outputdir"

# Download today's first one only
for path in $paths; do
  target="$downloaddir/$path"
  if [[ ! -f "$target" ]]; then
    echo "Téléchargement de $path..."
    curl -s -o "$target" "https://echanges.dila.gouv.fr/OPENDATA/JORFSIMPLE/$path"
    tar xf "$target" -C "$downloaddir"
    echo "OK."
  fi
  break
done


# search for given in summary files only
shopt -s globstar
IFS=";" read -ra ADDR <<< "$JORF_SEARCH_TERMS"
for term in "${ADDR[@]}"; do
  echo "============= $term ================"
  grep -i --no-filename "$term" $downloaddir/$for_date*/**/JORFCONT*.xml |grep -v "<TITRE_TM>" > "$outputdir/$term" || true
done
