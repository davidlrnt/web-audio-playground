const gulp       = require('gulp');
const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const babelify   = require('babelify');
const sync       = require('browser-sync').create();
const stylus     = require('gulp-stylus');
const eslint     = require('gulp-eslint');


gulp.task('browserify', function() {
  return browserify({
      entries: ['./src/main.js'],
    }).transform(babelify.configure({
      presets: ["es2015"]
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('js-watch', ['lint', 'browserify'], function (done) {
  sync.reload()
  done()
})

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(sync.stream());
})

gulp.task('serve', ['browserify'], function () {
  sync.init({
    server: { baseDir: "./dist" }
  })

  gulp.watch("src/*.js", ['js-watch'])
  gulp.watch('src/*.html',['html']);
  gulp.watch('src/styles/*.styl',['styl']);
})

gulp.task('styl', function () {
  gulp.src('src/styles/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(sync.stream());
});

gulp.task('lint', () => {
  console.log("lint");
  return gulp.src(['src/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task('default', ['html','styl','js-watch','serve']);
