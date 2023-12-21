PLAN_FILE=deploy.plan
WORKER_NAME=slack-sms-gateway # TODO: get from tf

main: plan

plan:
	terraform plan -out $(PLAN_FILE)

apply:
	terraform apply $(PLAN_FILE)

show:
	terraform show

init:
	terraform init -upgrade

clean:
	rm $(PLAN_FILE)

graph:
	terraform graph | dot -Tsvg > graph.svg

logs: log

log:
	wrangler tail $(WORKER_NAME)


.PHONY: clean plan log logs
