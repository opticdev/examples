#!/usr/local/bin sh

CMD="http"
HTTPIE_OPTS="--ignore-stdin"

"$CMD" "$HTTPIE_OPTS" "$OPTIC_PROXY"/
"$CMD" "$HTTPIE_OPTS" "$OPTIC_PROXY"/users
"$CMD" "$HTTPIE_OPTS" POST "$OPTIC_PROXY"/users/create name=Hank