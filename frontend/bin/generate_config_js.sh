#!/bin/sh -eu
cat <<EOF
window.appConfig = {
    API_URL: "$API_URL",
    MAX_CITY_ID: "$MAX_CITY_ID"
}
EOF
