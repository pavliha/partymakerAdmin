#!/bin/bash
docker-compose down
git reset --hard origin/master
git pull origin master
yarn build
docker-compose build admin
docker-compose up -d
