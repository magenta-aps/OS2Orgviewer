#!/usr/bin/env sh

# This take all environmant variables beginning with `OS2ORGVIEWER_` and
# serializes them to a JSON file as key-value pairs, stripping `OS2ORGVIEWER_`
# from the key. If the value is a string encoded as valid JSON, it is also
# serialized.

set -ex

jq --null-input '
  [
    env
      | to_entries[]
      | select(.key | startswith("OS2ORGVIEWER_")) as $ent
      | try (.value |= fromjson) catch $ent
      | .key |= sub("^OS2ORGVIEWER_"; "")
  ]
    | from_entries' > /usr/share/nginx/html/settings.json
