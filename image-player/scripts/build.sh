#!/usr/bin/env bash
printf "\n\n######## build ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Building ${IMAGE_REPOSITORY} from ${SOURCE_REPOSITORY_URL} /image-player on ${SOURCE_REPOSITORY_REF}"

s2i build ${SOURCE_REPOSITORY_URL} --ref ${SOURCE_REPOSITORY_REF} --context-dir /image-player centos/nodejs-12-centos7 ${IMAGE_REPOSITORY}
