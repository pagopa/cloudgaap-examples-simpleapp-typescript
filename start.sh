#!/usr/bin/env sh

echo "Starting docker images"
docker-compose up -d
echo "Docker images started"

echo "Executing tests"
yarn start:default
echo "Test executed"
