#!/bin/sh -eu
./bin/generate_config_js.sh > ./public/config.js
yarn run start
