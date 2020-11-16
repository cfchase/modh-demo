##################################

# BUILD - build all images locally using s2i

.PHONY: build
build:
	./scripts/build.sh

##################################

# PUSH - push image to repository

.PHONY: push
push:
	./scripts/push.sh

##################################

.PHONY: deploy
deploy: login
	./scripts/deploy.sh

##################################

.PHONY: undeploy
undeploy: login
	./scripts/undeploy.sh

##################################
