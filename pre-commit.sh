   #!/bin/sh

   # Get the last commit message
   LAST_COMMIT_MSG=$(git log -1 --pretty=%B)

   # Extract the last number used in the commit message
   LAST_NUMBER=$(echo $LAST_COMMIT_MSG | grep -o -E 'FE#([0-9]+)|BE#([0-9]+)' | grep -o -E '[0-9]+' | tail -1)

   # Increment the number by 1
   if [ -z "$LAST_NUMBER" ]; then
       NEXT_NUMBER=1
   else
       NEXT_NUMBER=$((LAST_NUMBER + 1))
   fi

   # Prompt the user to choose a prefix
   echo "Choose a prefix for your commit:"
   echo "1) FE"
   echo "2) BE"
   read PREFIX_CHOICE

   PREFIX=""
   if [ "$PREFIX_CHOICE" = "1" ]; then
       PREFIX="FE#"
   elif [ "$PREFIX_CHOICE" = "2" ]; then
       PREFIX="BE#"
   else
       echo "Invalid choice. Commit aborted."
       exit 1
   fi

   # Prepend the prefix and number to the commit message
   COMMIT_MSG_FILE=$(git rev-parse --git-path COMMIT_EDITMSG)
   NEW_COMMIT_MSG="${PREFIX}${NEXT_NUMBER} $(cat $COMMIT_MSG_FILE)"
   echo "$NEW_COMMIT_MSG" > $COMMIT_MSG_FILE