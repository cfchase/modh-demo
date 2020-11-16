#!/usr/bin/env bash
printf "\n\n######## build ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Building ${IMAGE_REPOSITORY} from ${SOURCE_REPOSITORY_URL} /object-detection-rest on ${SOURCE_REPOSITORY_REF}"

s2i build ${SOURCE_REPOSITORY_URL} --ref ${SOURCE_REPOSITORY_REF} --context-dir /object-detection-rest centos/python-38-centos7 ${IMAGE_REPOSITORY}
#s2i build ${SOURCE_REPOSITORY_URL} --ref ${SOURCE_REPOSITORY_REF} --context-dir /object-detection-rest registry.redhat.io/ubi8/python-38 ${IMAGE_REPOSITORY}
