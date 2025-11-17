#!/bin/env bash

set -e

regex="Update ([^ ]+) ([^ ]+) -> ([^ ]+)"
OLDIFS=$IFS
IFS=$'\n'

for update in $(uv lock --upgrade --dry-run 2>&1 |grep 'Update '); do
    if [[ "$update" =~ $regex ]]; then
        dep="${BASH_REMATCH[1]}"
        from_version="${BASH_REMATCH[2]}"
        to_version="${BASH_REMATCH[3]}"
        slugified=$(echo "$dep/$from_version-$to_version" | sed -E 's/[^a-zA-Z0-9]+/-/g')
        branch="chore/bump_deps/$slugified"
        git switch -c "$branch"
        uv lock --quiet --upgrade-package "$dep"
        git add uv.lock
        git commit -m "feat(deps): Bump $dep from $from_version to $to_version"
        git push -u origin "$branch"
        git switch main
    fi
done

IFS=$OLDIFS
