#!/bin/env bash

for branch in $(git branch --list chore/bump_deps/*); do
    git switch "${branch::-3}" && git rebase main && git push -f
done
