minify: gmap-button.js
	uglifyjs < gmap-button.js > gmap-button.min.js

push_demo:
	s3cmd sync -P . s3://www.jsvine.com/gmap-button/
