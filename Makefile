setup:
	docker-compose build

run:
	docker-compose up

test:
	docker-compose run app npm run test

stop:
	docker-compose down