update:
	npm install
	curl -o vendor/jasmine-jquery.js https://raw.github.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js
	curl -o vendor/jquery.min.js http://code.jquery.com/jquery.min.js
test:
	phantomjs vendor/jasmine_runner.coffee HeadlessRunner.html
