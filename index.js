'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var es6transpiler = require('es6-transpiler');

module.exports = function (options) {
	options = options || {};
	delete options.filename;
	delete options.outputToConsole;
	delete options.outputFilename;

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-es6-transpiler', 'Streaming not supported'));
			return cb();
		}

		var result;
		options.src = file.contents.toString();

		try {
			result = es6transpiler.run(options);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-es6-transpiler', err));
		}

		if (result.errors.length > 0) {
			this.emit('error', new gutil.PluginError('gulp-es6-transpiler\n', result.errors.join('\n')));
		} else {
			file.contents = new Buffer(result.src);
		}

		this.push(file);
		cb();
	});
};
