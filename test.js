'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var es6transpiler = require('./index');

it('should transpile ES6 to ES5', function (cb) {
	var stream = es6transpiler();

	stream.on('data', function (file) {
		assert.equal(file.contents.toString(), 'var x = 3;');
		cb();
	});

	stream.write(new gutil.File({
		contents: new Buffer('const x = 3;')
	}));
});

it('should handle errors on an exception from the transpiler', function (cb) {
	var stream = es6transpiler();

	stream.on('error', function () {
		cb();
	});

	stream.write(new gutil.File({
		contents: new Buffer('let a()a')
	}));
});
