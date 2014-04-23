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

		options.src = file.contents.toString();

		try {
			var result = es6transpiler.run(options);
			if (result.errors.length > 0) {
				this.emit('error', new gutil.PluginError('gulp-es6-transpiler\n', result.errors.join('\n')));
			} else {
				file.contents = new Buffer(result.src);
			}
		} catch (err) {
			err.fileName = file.path
			this.emit('error', new gutil.PluginError('gulp-es6-transpiler', err));
		}

		this.push(file);
		cb();
	});
};
