#!/usr/bin/env bash

INDEXPATH=/usr/share/nginx/html/index.html

# Create JSON_STRING with both environment variables
JSON_STRING=$( jq -n --arg apiUrl "$REACT_APP_API_URL" --arg googleClientId "$REACT_APP_GOOGLE_CLIENT_ID" \
  '{REACT_APP_API_URL: $apiUrl, REACT_APP_GOOGLE_CLIENT_ID: $googleClientId}' )

# Replace the placeholder with the JSON_STRING in the index.html file
sed -i "s/__SERVERDATA__/$JSON_STRING/g" $INDEXPATH
