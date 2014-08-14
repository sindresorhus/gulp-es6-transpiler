# [gulp](http://gulpjs.com)-es6-transpiler [![Build Status](https://travis-ci.org/sindresorhus/gulp-es6-transpiler.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-es6-transpiler)

> Transpile ES6 to ES5 with [es6-transpiler](https://github.com/termi/es6-transpiler)

*Issues with the output should be reported on the es6-transpiler [issue tracker](https://github.com/termi/es6-transpiler/issues).*


## Install

```sh
$ npm install --save-dev gulp-es6-transpiler
```


## Usage

```js
var gulp = require('gulp');
var es6transpiler = require('gulp-es6-transpiler');

gulp.task('default', function () {
	return gulp.src('src/app.js')
		.pipe(es6transpiler())
		.pipe(gulp.dest('dist'));
});
```


## API

### es6transpiler(options)

Use the es6-transpiler [options](https://github.com/termi/es6-transpiler#options), except for `filename`, `src`, `outputToConsole`, `outputFilename`.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
