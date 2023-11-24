#!/bin/sh
source .env

#build docker Image
docker build . -t link-wishlish-image:latest

#run docker image
docker run -d -t -i --env-file ./.env -p 8088:8081 --rm --name link-wishlish-node link-wishlish-image:latest