var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload');


gulp.task('dev', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'develop'
]);
