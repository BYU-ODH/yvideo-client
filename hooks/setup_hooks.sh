#!/bin/sh

git_root=$(git rev-parse --show-toplevel)

if [ ! -e "$git_root/.git/hooks/pre-push" ]; then
    ln -s "$git_root/hooks/pre-push" "$git_root/.git/hooks/pre-push"
    exit_code=$?
    if [ $exit_code -eq 0 ]; then
        echo "Added pre-push hook symlink"
    else
        echo "Failed to add pre-push hook symlink"
    fi
    exit $exit_code
fi

exit 0

