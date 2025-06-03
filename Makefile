# Использовать после настройки для деплоя
#TAG := $(shell git branch --show-current | tr A-Z a-z)
#VERSION := $(shell git describe --tags)
#
#dev-push:
#	TAG=${TAG} docker compose build && TAG=${TAG} docker compose push
#release-push:
#	TAG=${VERSION} docker compose build && TAG=${VERSION} docker compose push && git push --tags
#up:
#	TAG=local docker compose up --build
