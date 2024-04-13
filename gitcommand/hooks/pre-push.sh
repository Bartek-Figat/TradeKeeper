#!/bin/bash

CONFIG_FILE=".commit-prefix-config"
PREFIXES=$(cat $CONFIG_FILE)

echo "Checking commit message prefixes..."

while read local_ref local_sha remote_ref remote_sha
do
    if [ "$local_ref" = "refs/heads/main" ]; then
        echo "Checking commits on the main branch..."
        while IFS= read -r line; do
            if ! grep -q "^$line" <<< "$(git log --format=%B -n 1 $local_sha)"; then
                echo "Error: Commit message must start with one of the prefixes defined in $CONFIG_FILE (e.g., $line)"
                exit 1
            fi
        done <<< "$PREFIXES"
    fi
done

echo "Commit message prefixes check completed successfully."