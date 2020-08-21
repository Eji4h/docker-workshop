init:
	docker-compose -f docker-compose.init.yaml up

clean:
	sudo rm -rf frontend/node_modules backend/node_modules

clean-db-dev:
	sudo rm -rf db/tmp

clean-db-prod:
	docker volume rm docker-compose-demo_db-data-prod

start-dev:
	docker-compose up -d

down-dev:
	docker-compose down

restart-dev:
	docker-compose down && docker-compose up -d

logs-dev:
	docker-compose logs -f

start-prod:
	docker-compose -f docker-compose.prod.yaml up -d

down-prod:
	docker-compose -f docker-compose.prod.yaml down

restart-prod:
	docker-compose -f docker-compose.prod.yaml down && docker-compose -f docker-compose.prod.yaml up -d

logs-prod:
	docker-compose -f docker-compose.prod.yaml logs -f
