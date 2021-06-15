#!/usr/bin/env bash

INDEXPATH=/usr/share/nginx/html/index.html
JSON_STRING=$( jq -n --arg apiUrl "$REACT_APP_API_URL" '{REACT_APP_API_URL: $apiUrl}' )
sed -i 's/__SERVERDATA__/$JSON_STRING/g' $INDEXPATH
#awk '{sub("__SERVERDATA__",$JSON_STRING)}1' $1 > temp.txt && mv temp.txt $1
