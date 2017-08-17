var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	del = require('del');
	cmq = require('gulp-combine-media-queries'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	fontName = 'Icons';

gulp.task('serve', function() {
    browserSync.init({ proxy: "" }); // heyyyy don't forget to update this to your local project address
    gulp.watch("**/*.scss", ['styles']);
    gulp.watch("**/*.php").on('change', reload);
});

gulp.task('styles', function() {
    return sass('css/style.scss', { style: 'compressed', sourcemap: false })
    .pipe(autoprefixer('last 3 version'))
    .on('error', function (err) { console.log(err.message); })
    .pipe(cmq({
      log: true
    }))
    .pipe(gulp.dest('css'))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('iconfont', function(){
	gulp.src(['img/icons/*.svg'])
	.pipe(iconfontCss({
		fontName: fontName,
		fontPath: 'fonts/',
		targetPath: '_icons.scss'
	}))
	.pipe(iconfont({
		fontName: fontName,
		fontHeight: 1001,
		normalize: true
	}))
	.pipe(gulp.dest('css/fonts/'));
});

gulp.task('images', function() {
	return gulp.src('img/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
	.pipe(gulp.dest('img'))
	.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('cmq', function () {
  gulp.src('css/**/*.css')
    .pipe(cmq({
      log: true
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {
  return gulp.src('js/**/*')
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(notify({ message: 'Js build complete' }));
});

gulp.task('default', function() {
	gulp.start('styles', 'images');
});

gulp.task('watch', function() {
	gulp.watch('css/**/*.scss', ['styles']);
});

gulp.task('concat', function() {
	gulp.watch('js/**/*', ['scripts']);
});