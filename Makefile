all: build deploy

build:
	docker build --platform=linux/amd64 -t $$(basename $$PWD) .

run: build
	docker run -itp8123:8123 --rm $(FLAGS) $$(basename $$PWD)

crash:
	$(MAKE) FLAGS="-d --name $$(basename $$PWD)-crash" run; \
	while ! curl 127.0.0.1:8123 >/dev/null 2>&1; do sleep 1; done
	timeout 5s curl -svkXPOST -d'{"type":"SCANNING_COMPLETED","event_data":{"resources":[{"digest":"sha256:f302741af6fa1e2ebfead5a7828d953816e8e9eca773d812ca8a95637d414401","tag":"latest","resource_url":"some-image-ref:latest","scan_overview":{"application/vnd.security.vulnerability.report; version=1.1":{"report_id":"d96e643f-a886-4687-8803-e3a3a0ee8725","scan_status":"Success","severity":"Critical","duration":2,"summary":{"total":77,"fixable":77,"summary":{"Critical":6,"High":31,"Low":4,"Medium":36}},"start_time":"2024-06-19T08:59:32Z","end_time":"2024-06-19T08:59:34Z","scanner":{"name":"Trivy","vendor":"Aqua Security","version":"v0.42.0"},"complete_percent":100}}}],"repository":{"name":"dev/xxx/xxx-front","namespace":"library","repo_full_name":"library/dev/xxx/xxx-front","repo_type":"public"}}}' 127.0.0.1:8123/process || true
	docker logs $$(basename $$PWD)-crash
	docker rm -f $$(basename $$PWD)-crash

deploy:
	docker save harbor-scanner-events-processor | \
		gzip -c9 | \
		ssh kad@infra-harbor.comita.sel 'cat > /tmp/harbor-scanner-events-processor.tgz'

.PHONY: all build run deploy
