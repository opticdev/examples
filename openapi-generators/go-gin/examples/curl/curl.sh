#!/usr/bin/env sh

OPTS="-s"

curl "$OPTS" "$OPTIC_PROXY"/
curl "$OPTS" "$OPTIC_PROXY"/users
curl "$OPTS" -XPOST "$OPTIC_PROXY"/users/create \
   -H 'Content-Type: application/json' \
   -d '{"name": "Hank"}'
