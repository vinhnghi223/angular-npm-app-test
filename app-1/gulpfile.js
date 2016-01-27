"use strict";

var gulp = require('gulp');
var del = require('del');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var runSequence = require('run-sequence');
var _ = require('lodash');
var path = require('join-path');

var config = require('./config');
var browserifiers = require('./browserifiers');



gulp.task('clean', function () {
    return del(config.paths.build + '/**', {force: true});
});

gulp.task('build', function (cb) {
    runSequence('clean',
        [
            'js-libs',
            'js-app',
            'resources'
        ],
        cb
    );
});

gulp.task('watch', function (cb) {
    runSequence(['watch:js-app', 'watch:resources'], cb);
});

gulp.task('run', function (cb) {
    runSequence('build', ['watch', 'webserver'], cb);
});


function browserifyBuild(buildOpts) {
    var browserifyOpts = {
        debug: true
    };
    var browserified = buildOpts.browserifier(browserifyOpts);

    return browserified.bundle()
        .on('error', gutil.log.bind(gutil.log, "Browserify error:"))
        .pipe(source(buildOpts.outputFileName))
        .pipe(buffer())
        .pipe(gulp.dest(config.paths.build));
}

gulp.task('js-libs', function () {
    return browserifyBuild({
        browserifier: browserifiers.forLibs,
        outputFileName: config.paths.libDestName
    });
});

gulp.task('js-app', function() {
    return browserifyBuild({
        browserifier: browserifiers.forApp,
        outputFileName: config.paths.appDestName
    });
});

gulp.task('watch:js-app', function () {
    var watchifier = function(opts) {
        return watchify(browserifiers.forApp(opts))
            .on('log', gutil.log.bind(gutil.log, "Watchify (app):"))
            .on('update', build);
    };

    return build();

    function build() {
        return browserifyBuild({
            browserifier: watchifier,
            outputFileName: config.paths.appDestName
        });
    }
});


gulp.task('resources', function () {
    return gulp.src(config.paths.resources)
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('watch:resources', function () {
    return gulp.watch(config.paths.resources, ['resources']);
});


gulp.task('webserver', function() {
    gulp.src(config.paths.build)
        .pipe(webserver({
            port: 8081,
            livereload: true
        }));
});