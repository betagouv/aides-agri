#!/bin/env bash

set -e

regex="Update ([^ ]+) v([^ ]+) -> v([^ ]+)"
OLDIFS=$IFS
IFS=$'\n'

echo "First, fetch origin..."
git fetch origin --quiet
echo "... done"

echo "Then, check which packages uv wants to upgrade..."
for update in $(uv lock --upgrade --dry-run 2>&1 |grep 'Update '); do
    if [[ "$update" =~ $regex ]]; then
        dep="${BASH_REMATCH[1]}"
        from_version="${BASH_REMATCH[2]}"
        to_version="${BASH_REMATCH[3]}"
        slugified_dep=$(echo "$dep" | sed -E 's/[^a-zA-Z0-9]+/-/g')
        dependabot_branch_pattern="dependabot/uv/$slugified_dep-$to_version"
        echo "-> Found $dep to be bumped from $from_version to $to_version..."
        if [[ -n $(git branch -a |grep "$dependabot_branch_pattern") ]]; then
            echo "... ignoring because Dependabot seems to already have opened a PR about it."
            continue
        fi
        branch="dependencies/$slugified_dep-$from_version-$to_version"
        if [[ -n $(git branch -q --no-color |grep "$branch") ]]; then
          echo "... ignoring because there is already a local branch about it."
          continue
        fi
        echo "... pushing branch $branch for that..."
        git switch -c "$branch" --quiet
        uv lock --quiet --upgrade-package "$dep"
        git add uv.lock
        git commit --quiet -m "feat(deps): Bump $dep from $from_version to $to_version"
        git push --quiet -u origin "$branch"
        echo "... done."
        git switch main --quiet
    fi
done

IFS=$OLDIFS
