BIN = ./node_modules/.bin/

client index.js:
	@${BIN}component install
	@${BIN}component build
	@${BIN}autoprefixer -o build/example.css build/build.css
	@echo "\n\nrequire('boot');" \
		| cat build/build.js - > build/example.js

watch:
	@${BIN}nodemon \
		--watch client \
		--ext css,js,json,html \
		--exec "make" \
		index.js

start serve:
	@${BIN}nodemon --harmony .

jshint hint lint:
	@${BIN}jshint .

.PHONY: client index.js watch start serve