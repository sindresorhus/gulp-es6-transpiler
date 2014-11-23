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
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-es6-transpiler', 'Streaming not supported'));
			return;
		}

		options.src = file.contents.toString();

		try {
			var result = es6transpiler.run(options);

			if (result.errors.length > 0) {
				cb(new gutil.PluginError('gulp-es6-transpiler\n', result.errors.join('\n'), {
					fileName: file.path,
					showStack: false
				}));
				return;

			}

			file.contents = new Buffer(result.src);
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-es6-transpiler', err, {fileName: file.path}));
		}

		cb();
	});
};
