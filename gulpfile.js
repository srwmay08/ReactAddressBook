var gulp = require("gulp");

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');
var watch = require('gulp-watch');



gulp.task(
	'clean',
	function() {
		return del('./build');
	}
);

gulp.task(
	'html',
	['clean'],
	function() {
		return gulp
			.src('./source/**/*.html')
			.pipe(gulp.dest('./build/'))
	}
);

gulp.task(
	'javascript',
	['clean'],
	function () {
		return browserify('./source/app.js', {debug: true})
			.transform(babelify, {presets: ["react"]})
			.bundle()
			.pipe(source('app.compiled.js'))
			.pipe(gulp.dest('./build/'));
	}
);

gulp.task(
	'default',
	['clean', 'html', 'javascript']
);

gulp.task(
	'watch',
	function () {
		watch('source/**/*', function (events) {
        	gulp.start('default');
    	});
	}
);
