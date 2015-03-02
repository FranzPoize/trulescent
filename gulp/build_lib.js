
'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

 gulp.task('styles-lib', ['wiredep'],  function () {
  return gulp.src('src/components/**/*.less')
    .pipe($.less({
      paths: [
        'src/components'
      ]
    }))
    .on('error', handleError)
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size());
});

gulp.task('scripts-lib', function () {
  return gulp.src('src/components/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('partials-lib', function () {
  return gulp.src('src/components/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'trulescent',
      prefix:'components/'
    }))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size());
});

gulp.task('html-lib', ['styles-lib', 'scripts-lib', 'partials-lib'], function () {
   var jsFilter = $.filter('**/*.js');
   var cssFilter = $.filter('**/*.css');

    return gulp.src(['src/app/index.js','src/components/**/*.js','.tmp/**/*.js','.tmp/**/*.css'])
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.concat('trulescent.js'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe($.concatCss('trulescent.css'))
      .pipe(cssFilter.restore())
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

gulp.task('html-lib-min', ['styles-lib', 'scripts-lib', 'partials-lib'], function () {
   var jsFilter = $.filter('**/*.js');
   var cssFilter = $.filter('**/*.css');

    return gulp.src(['src/app/index.js','src/components/**/*.js','.tmp/**/*.js','.tmp/**/*.css'])
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify())
      .pipe($.concat('trulescent.min.js'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe($.concatCss('trulescent.min.css'))
      .pipe(cssFilter.restore())
      .pipe(gulp.dest('dist'))
      .pipe($.size());
});

gulp.task('build-lib', ['html-lib']);
gulp.task('build-lib-min', ['html-lib-min']);
gulp.task('build-all', ['html-lib','html-lib-min']);
