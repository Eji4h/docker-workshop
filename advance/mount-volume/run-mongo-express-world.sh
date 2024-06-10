#!/bin/bash

docker run -d -p 8082:8081 \
	--name mongo-express-world \
	-e ME_CONFIG_BASICAUTH_USERNAME=kbtg \
	-e ME_CONFIG_BASICAUTH_PASSWORD=gtbk \
	-e ME_CONFIG_MONGODB_URL=mongodb://root:myPassword@mongo:27017/ \
	--link mongo-world:mongo \
	mongo-express:1.0.0-20-alpine3.18
