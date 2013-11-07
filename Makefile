BIN = ./node_modules/.bin/

client index.js:
	@${BIN}component install
	@${BIN}component build
	@mv build/build.css build/example.css
	@echo "\n\nrequire('boot');" \
		| cat build/build.js - > build/example.js
	@${BIN}autoprefixer build/example.css

.PHONY: client index.js