#!/usr/bin/env bash
set -eu

# GET /
curl http://localhost:8000/

# GET /users
curl http://localhost:8000/users

# POST /users/create
curl http://localhost:8000/users/create \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe"}'
