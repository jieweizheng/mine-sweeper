var gulp = require("gulp");
var connect = require("gulp-connect");


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

gulp.task('watch', function(){
  gulp.watch([addr.css, addr.html], ['reload'])
});

gulp.task('default', ['start-connect-server', 'watch']);
