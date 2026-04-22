#!/usr/bin/env bash

declare -A departements_littoral=(
        ["59"]=1
        ["62"]=1
        ["80"]=1
        ["76"]=1
        ["27"]=1
        ["14"]=1
        ["50"]=1
        ["35"]=1
        ["22"]=1
        ["29"]=1
        ["56"]=1
        ["44"]=1
        ["85"]=1
        ["17"]=1
        ["33"]=1
        ["40"]=1
        ["64"]=1
        ["971"]=1
        ["972"]=1
        ["973"]=1
        ["974"]=1
        ["975"]=1
        ["976"]=1
        ["66"]=1
        ["11"]=1
        ["34"]=1
        ["30"]=1
        ["13"]=1
        ["83"]=1
        ["06"]=1
        ["2A"]=1
        ["2B"]=1
)
for f in data/pref-*.png; do
  tmp=${f:10}
  code=${tmp%.*}
  if [[ ${departements_littoral[$code]} ]]; then
    magick convert +append "$f" "ddtm.png" "data/ddt-$code.png"
  else
    magick convert +append "$f" "ddt.png" "data/ddt-$code.png"
  fi
done
