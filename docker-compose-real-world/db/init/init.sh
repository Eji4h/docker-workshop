#!/bin/bash

mongoimport --db='world' --collection='cities' --file='/tmp/init-data/cities.json' --jsonArray --username=$MONGO_INITDB_ROOT_USERNAME --password=$MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase=admin
mongoimport --db='world' --collection='states' --file='/tmp/init-data/states.json' --jsonArray --username=$MONGO_INITDB_ROOT_USERNAME --password=$MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase=admin
mongoimport --db='world' --collection='countries' --file='/tmp/init-data/countries.json' --jsonArray --username=$MONGO_INITDB_ROOT_USERNAME --password=$MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase=admin
