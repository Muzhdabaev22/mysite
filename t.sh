#!/bin/bash

countries=()

while IFS= read -r line; do
    countries+=("$line")
done

for i in "${!countries[@]}"; do
    if [[ ${countries[i]} =~ ^[A-Z] ]]; then
        countries[i]=".${countries[i]:1}"
    fi
done

echo "${countries[@]}"