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
var browserifyBundler = require('./browserifyBundler');


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


function executeBundling(buildOpts) {
    var browserifyOpts = {
        debug: true
    };
    var browserifyBundler = buildOpts.browserifyBundler(browserifyOpts);

    return browserifyBundler.bundle()
        .on('error', gutil.log.bind(gutil.log, "Browserify error:"))
        .pipe(source(buildOpts.outputFileName))
        .pipe(buffer())
        .pipe(gulp.dest(config.paths.build));
}

gulp.task('js-libs', function () {
    return executeBundling({
        browserifyBundler: browserifyBundler.forLibs,
        outputFileName: config.paths.libDestName
    });
});

gulp.task('js-app', function() {
    return executeBundling({
        browserifyBundler: browserifyBundler.forApp,
        outputFileName: config.paths.appDestName
    });
});

gulp.task('watch:js-app', function () {
    var watchifyBundler = function(opts) {
        return watchify(browserifyBundler.forApp(opts))
            .on('log', gutil.log.bind(gutil.log, "Watchify (app):"))
            .on('update', build);
    };

    var build = function() {
        return executeBundling({
            browserifyBundler: watchifyBundler,
            outputFileName: config.paths.appDestName
        });
    };

    return build();

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
            livereload: true,
            open:true
        }));
});