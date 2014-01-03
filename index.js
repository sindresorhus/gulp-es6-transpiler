'use strict';
var gutil = require('gulp-util');
var map = require('map-stream');
var es6transpiler = require('es6-transpiler');

module.exports = function (options) {
	options = options || {};

	delete options.filename;
	delete options.outputToConsole;
	delete options.outputFilename;

	return map(function (file, cb) {
		if (file.isNull()) {
			return cb(null, file);
		}

		var result;
		options.src = file.contents.toString();

		try {
			result = es6transpiler.run(options);
		} catch (err) {
			err.message = 'gulp-es6-transpiler: ' + err.message;
			return cb(err);
		}

		if (result.errors.length > 0) {
			return cb(new Error('\n' + result.errors.map(function (el) {
				return 'gulp-es6-transpiler: ' + el;
			}).join('\n')));
		}

		file.contents = new Buffer(result.src);
		cb(null, file);
	});
};
