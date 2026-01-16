# Load .env if it exists
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: lint run build sign clean release

lint:
	web-ext lint

run:
	web-ext run

build:
	web-ext build

sign:
	web-ext sign --api-key=$(AMO_JWT_ISSUER) --api-secret=$(AMO_JWT_SECRET)

clean:
	rm -rf web-ext-artifacts/

release:
ifndef VERSION
	$(error VERSION is required. Usage: make release VERSION=1.0.1)
endif
	@echo "Releasing version $(VERSION)..."
	sed -i 's/"version": ".*"/"version": "$(VERSION)"/' manifest.json
	$(MAKE) build
	git add manifest.json
	git commit -m "Release v$(VERSION)"
	git tag -a "v$(VERSION)" -m "Release v$(VERSION)"
	git push origin main --tags
	gh release create "v$(VERSION)" web-ext-artifacts/*.zip --title "v$(VERSION)" --notes "Release v$(VERSION)"
