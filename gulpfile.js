"use strict";

var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	htmlify = require('gulp-angular-htmlify'),
	rename = require('gulp-rename'),
	prefix = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync').create();

var useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
	cssmin = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	rimraf = require('rimraf'),
	ftp = require('vinyl-ftp'),
	notify = require('gulp-notify');

var paths = {
			blocks: 'build/',
			devDir: 'app/',
			outputDir: 'ebola/'
		};


/*********************************
		Developer tasks
*********************************/

//pug compile
gulp.task('pug', function() {
	return gulp.src([paths.blocks + '*.pug', '!' + paths.blocks + 'template.pug' ])
		.pipe(plumber())
		.pipe(pug({pretty: true}))
		.pipe(htmlify())
		.pipe(gulp.dest(paths.devDir))
		.pipe(browserSync.stream())
});

//sass compile
gulp.task('sass', function() {
	return gulp.src(paths.blocks + '*.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(paths.devDir + 'css/'))
		.pipe(browserSync.stream());
});

//js compile
//gulp.task('scripts', function() {
//	return gulp.src([
//			paths.blocks + '**/*.js',
//			'!' + paths.blocks + '_assets/**/*.js'
//		])
//		.pipe(concat('main.js'))
//		.pipe(gulp.dest(paths.devDir + 'js/'))
//		.pipe(browserSync.stream());
//});
gulp.task('scripts', function() {
	return gulp.src([
		paths.blocks + 'components/**/*.js',
		'!' + paths.blocks + '_assets/**/*.js'
	])
	  .pipe(gulp.dest(paths.devDir + 'js/'))
	  .pipe(browserSync.stream());
});

//watch
gulp.task('watch', function() {
	gulp.watch(paths.blocks + '**/*.pug', ['pug']);
	gulp.watch(paths.blocks + '**/*.scss', ['sass']);
	gulp.watch(paths.blocks + '**/*.js', ['scripts']);
});

//server
gulp.task('browser-sync', function() {
	browserSync.init({
		port: 3000,
		server: {
			baseDir: paths.devDir
		}
	});
});


/*********************************
		Production tasks
*********************************/

//clean
gulp.task('clean', function(cb) {
	rimraf(paths.outputDir, cb);
});

//css + js
gulp.task('build', ['clean'], function () {
	return gulp.src(paths.devDir + '*.html')
		.pipe( useref() )
		.pipe( gulpif('*.js', uglify()) )
		.pipe( gulpif('*.css', cssmin()) )
		.pipe( gulp.dest(paths.outputDir) );
});

//copy images to outputDir
gulp.task('imgBuild', ['clean'], function() {
	return gulp.src(paths.devDir + 'img/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest(paths.outputDir + 'img/'));
});



//develop
gulp.task('develop', ['browser-sync', 'watch', 'pug', 'sass', 'scripts']);

//production
gulp.task('production', ['build', 'imgBuild']);

//default
gulp.task('default', ['develop']);