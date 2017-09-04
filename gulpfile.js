var gulp = require("gulp");
var connect = require("gulp-connect");
var concat = require("gulp-concat");

var addr = {
  css: 'builds/development/css/*.css',
  js: 'builds/development/js/*.js',
  html: 'builds/development/index.html'
}

gulp.task('start-connect-server', function(){
  connect.server({
    root: 'builds/development',
    livereload: true
  });
});

gulp.task('reload', function(){
  gulp.src('builds/development/')
  .pipe(connect.reload());
});

gulp.task('js', function(){
  gulp.src('builds/development/js/*.js')
  .pipe(concat('game.js'))
  .pipe(gulp.dest('builds/development'));
});

gulp.task('watch', function(){
  gulp.watch([addr.css, addr.html, addr.js], ['js', 'reload'])
});

gulp.task('default', ['js', 'start-connect-server', 'watch']);
