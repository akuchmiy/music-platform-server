#!/bin/bash
set -e

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

SERVER="music_server"

(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER \
    -p 5432:5432 \
    -e PGPASSWORD="$POSTGRES_PASSWORD" \
    -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
    -d postgres

sleep 3

echo "CREATE DATABASE $POSTGRES_DATABASE ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres