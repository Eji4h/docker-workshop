#!/bin/bash

docker run -d -p 8081:8081 \
	--name mongo-express \
	-e ME_CONFIG_MONGODB_URL=mongodb://root:myPassword@mongo:27017/ \
	--link mongo:mongo \
	mongo-express:1.0.0-20-alpine3.18
