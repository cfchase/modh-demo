#!/usr/bin/env bash
printf "\n\n######## undeploy ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

oc project ${OC_PROJECT} 2> /dev/null
oc project

oc delete -k "${DIR}/kustomize/base"