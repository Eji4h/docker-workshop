init:
	docker-compose -f compose.init.yaml up --build --remove-orphans
	sudo chown -R ${USER} frontend/node_modules ${PNPM_PATH}
	sudo chown -R ${USER} backend/node_modules ${PNPM_PATH}
	sudo chmod -R 755 frontend/node_modules ${PNPM_PATH}
	sudo chmod -R 755 backend/node_modules ${PNPM_PATH}

clean:
	sudo rm -rf frontend/node_modules backend/node_modules

clean-db-dev:
	sudo rm -rf db/data

clean-db-prod:
	docker volume rm docker-compose-real-world_db-data-prod

start-dev:
	docker compose up -d

down-dev:
	docker compose down

restart-dev:
	docker compose down && docker compose up -d

logs-dev:
	docker compose logs -f

restart-and-logs-dev:
	docker compose down && docker compose up -d && docker compose logs -f

start-prod:
	docker compose -f compose.prod.yaml up -d

down-prod:
	docker compose -f compose.prod.yaml down

restart-prod:
	docker compose -f compose.prod.yaml down && docker compose -f compose.prod.yaml up -d

logs-prod:
	docker compose -f compose.prod.yaml logs -f

restart-and-logs-prod:
	docker compose -f compose.prod.yaml down && docker compose -f compose.prod.yaml up -d && docker compose -f compose.prod.yaml logs -f
