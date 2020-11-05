#!/usr/bin/env bash
printf "\n\n######## undeploy ########\n"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

oc project ${OC_PROJECT} 2> /dev/null
oc project

envsubst < "${DIR}/kustomize/overlays/dev/kustomization_template.yaml" > "${DIR}/kustomize/overlays/dev/kustomization.yaml"
envsubst < "${DIR}/kustomize/overlays/dev/deployment_patch_template.yaml" > "${DIR}/kustomize/overlays/dev/deployment_patch.yaml"
oc delete -k "${DIR}/kustomize/overlays/dev"