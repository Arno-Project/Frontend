.PHONY: build up down restart logs deploy-build
build:
	docker-compose up --build -d
up:
	docker-compose up -d
down:
	docker-compose down
restart:
	docker-compose restart
logs:
	docker-compose logs
deploy-build:
	npm i && npm run build && docker-compose up --build -d && cp ./build-config/Dockerfile ./build/Dockerfile && cp ./build-config/docker-compose.yml ./build/docker-compose.yml  && cp ./build-config/default.conf ./build/default.conf && docker-compose --file ./build/docker-compose.yml up --build -d
