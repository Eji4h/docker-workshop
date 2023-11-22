#!/bin/bash

docker run -d -p 27018:27017 \
	--name mongo-world \
	-e MONGO_INITDB_ROOT_USERNAME=root \
	-e MONGO_INITDB_ROOT_PASSWORD=myPassword \
	-e MONGO_INITDB_DATABASE=world \
	-v ./db/init/:/docker-entrypoint-initdb.d/:ro \
	-v ./db/init-data/:/tmp/init-data/:ro \
	mongo:7.0.3
