BIN = ./node_modules/.bin/

client index.js:
	@${BIN}component install
	@${BIN}component build
	@${BIN}autoprefixer -o build/example.css build/build.css
	@echo "\n\nrequire('boot');" \
		| cat build/build.js - > build/example.js

.PHONY: client index.js