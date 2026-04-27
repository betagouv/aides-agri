#!/usr/bin/env bash

declare -A regions_daaf=(
        ["01"]=1
        ["02"]=1
        ["03"]=1
        ["04"]=1
        ["06"]=1
)
declare -A regions_drial=(
        ["11"]=1
)
for f in data/pref-region-*.png; do
  tmp=${f:17}
  code=${tmp%.*}
  if [[ ${regions_daaf[$code]} ]]; then
    magick convert +append "$f" "logos/daaf.png" "data/draaf-$code.png"
    magick convert +append "$f" "logos/deal.png" "data/dreal-$code.png"
  elif [[ ${regions_drial[$code]} ]]; then
    magick convert +append "$f" "logos/daaf.png" "data/draaf-$code.png"
    magick convert +append "$f" "logos/deal.png" "data/dreal-$code.png"
  else
    magick convert +append "$f" "logos/draaf.png" "data/draaf-$code.png"
    magick convert +append "$f" "logos/dreal.png" "data/dreal-$code.png"
  fi
done
