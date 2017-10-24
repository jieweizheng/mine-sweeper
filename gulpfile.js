var gulp = require("gulp");
var connect = require("gulp-connect");
var concat = require("gulp-concat");

var addr = {
  css: 'builds/development/css/*.css',
  js: 'builds/development/js/*.js',
  html: 'builds/development/index.html',
  img: 'builds/development/img/*'
}

gulp.task('start-connect-server', function(){
  connect.server({
    root: 'builds/production',
    livereload: true
  });
});

gulp.task('reload', function(){
  gulp.src('builds/development/')
  .pipe(connect.reload());
});

gulp.task('js', function(){
  gulp.src(['builds/development/js/variables.js', 'builds/development/js/*.js'])
  .pipe(concat('game.js'))
  .pipe(gulp.dest('builds/production/'));
});

gulp.task('html', function(){
  gulp.src(addr.html).pipe(gulp.dest('builds/production'));
});

gulp.task('css', function(){
  gulp.src(addr.css).pipe(gulp.dest('builds/production'));
});

gulp.task('img', function(){
  gulp.src(addr.img).pipe(gulp.dest('builds/production/img/'));
});

gulp.task('watch', function(){
  gulp.watch([addr.css, addr.html, addr.js], ['js', 'html', 'css', 'reload'])
});

gulp.task('default', ['js', 'html', 'css', 'img', 'start-connect-server', 'watch']);
