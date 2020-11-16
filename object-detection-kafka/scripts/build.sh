#!/usr/bin/env bash
printf "\n\n######## build ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Building ${IMAGE_REPOSITORY} from ${SOURCE_REPOSITORY_URL} /object-detection-kafka on ${SOURCE_REPOSITORY_REF}"

s2i build ${SOURCE_REPOSITORY_URL} --ref ${SOURCE_REPOSITORY_REF} --context-dir /object-detection-kafka registry.redhat.io/ubi8/python-38 ${IMAGE_REPOSITORY}
