run:
	@docker-compose up -d --build --remove-orphans
stop:
	@docker-compose down
run-dev-1:
	@python3 manage.py runserver 8080
run-8080:
	@nohup python3.9 manage.py runserver 0.0.0.0:8080 </dev/null &>/dev/null &	
