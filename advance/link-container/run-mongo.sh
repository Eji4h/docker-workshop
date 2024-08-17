#!/bin/bash

docker run -d \
	--name mongo \
	-e MONGO_INITDB_ROOT_USERNAME=root \
	-e MONGO_INITDB_ROOT_PASSWORD=myPassword \
	mongo:7.0.12
