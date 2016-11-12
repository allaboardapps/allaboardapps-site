'use strict';

// Import modules
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var chalk = require('chalk');
var del = require('del');
var duration = require('gulp-duration');
var fs = require('fs');
var git = require('gulp-git');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minifycss = require('gulp-clean-css');
var minimist = require('minimist');
var notifier = require('node-notifier');
var notify = require('gulp-notify');
var react = require('react');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var RevAll = require('gulp-rev-all');
var sass = require('gulp-sass');
var Server = require('karma').Server;
var source = require('vinyl-source-stream');

// Configuration
var config = {
  build: {
    buildPath: './build/',
    srcPath: './build/**',
    watchPath: './build/**/*',
  },
  dist: {
    buildPath: './dist/',
    srcPath: './dist/**',
    watchPath: './dist/**/*',
  },
  css: {
    buildPath: './build/',
    srcPath: './src/css/*.scss',
    watchPath: './src/css/**/*',
  },
  html: {
    buildPath: './build/',
    srcPath: './src/html/*.html',
    watchPath: './src/html/**/*',
  },
  images: {
    buildPath: './build/',
    srcPath: './src/images/*',
    watchPath: './src/images/**/*',
  },
  js: {
    buildFile: 'main.min.js',
    buildPath: './build/',
    srcFile: 'main.jsx',
    srcPath: './src/js/',
    watchPath: './src/js/**/*',
  },
  fonts: {
    buildPath: './build/',
    srcPath: './src/fonts/*.scss',
    watchPath: './src/fonts/**/*',
  }
};

// Error reporting function
function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    browserSync.notify('Browserify Error!');
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

// Completes the final file outputs
function bundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError)
    .pipe(source(config.js.srcFile))
    .pipe(buffer())
    .pipe(rename(config.js.buildFile))
    .pipe(gulp.dest(config.js.buildPath))
    .pipe(bundleTimer)
    .pipe(reload({ stream: true }));
}

// Default task for Gulp
gulp.task('default', ['html', 'images', 'fonts', 'css', 'js', 'serve', 'watch'], function() {
  notifier.notify({ 'subtitle': 'Build/Launch Status', 'message': 'Application launched in Development' });
});

// Default task for Gulp
gulp.task('build', ['html', 'images', 'fonts', 'css', 'js'], function() {
  notifier.notify({ 'subtitle': 'Build Status', 'message': 'Application build complete' });
});

// Default task for Gulp
gulp.task('deploy', ['build', 'dist'], function() {
  notifier.notify({ 'subtitle': 'Deploy Status', 'message': 'Application build and dist process complete' });
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('serve-dist', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});

// Process JavaScript
gulp.task('js', function() {
  var bundler = browserify(config.js.srcPath + config.js.srcFile)
    .transform(babelify, { presets: ['es2015', 'react'] });
  bundle(bundler)
});

gulp.task('css', function() {
  gulp.src(config.css.srcPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(config.css.buildPath))
    .pipe(reload({ stream: true }));
});

gulp.task('watch', function() {
  gulp.watch(config.js.watchPath, ["js"]);
  gulp.watch(config.css.watchPath, ["css"]);
  gulp.watch(config.html.watchPath, ["html"]);
  gulp.watch(config.fonts.watchPath, ["fonts"])
  gulp.watch(config.images.watchPath, ["images"]);
});

gulp.task('images', function() {
  gulp.src(config.images.srcPath)
    .pipe(gulp.dest(config.images.buildPath))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
  gulp.src(config.fonts.srcPath)
    .pipe(gulp.dest(config.fonts.buildPath))
    .pipe(reload({ stream: true }));
});

gulp.task('html', function() {
  gulp.src(config.html.srcPath)
    .pipe(gulp.dest(config.html.buildPath))
    .pipe(reload({ stream: true }));
});

gulp.task('dist', function () {
  // delete contents of the /dist directory
  del([config.dist.watchPath]);

  // create new versions of files with new names to invalidate cache
  var revAll = new RevAll({ dontRenameFile: [/^\/favicon.ico$/g, '.html'] });
  gulp.src(config.build.srcPath)
    .pipe(revAll.revision())
    .pipe(gulp.dest(config.dist.buildPath))
    notifier.notify({ 'subtitle': 'Distribution Status', 'message': 'Application files revised for caching' });
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
