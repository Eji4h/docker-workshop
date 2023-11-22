#!/bin/bash

docker run --detach --publish 8080:80 --name web nginx
