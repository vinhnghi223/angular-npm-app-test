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
var ngTemplateCache = require('gulp-angular-templatecache');
var mergeStream = require('merge-stream');

var config = require('./config');
config.deployMocks = false;

var browserifiers = require('./browserifiers');


gulp.task('clean', function () {
    return del(config.paths.build + '/**', {force: true});
});

gulp.task('build', function (cb) {
    runSequence('clean',
        [
            'js-libs',
            'myapp-js',
            'myapp-angular-templates',
            'myapp-static-assets'
        ],
        cb
    );
});

gulp.task('build-mock', function (cb) {
    config.deployMocks = true;
    runSequence('build', cb);
});

gulp.task('watch', function (cb) {
    runSequence(['watch:myapp-js', 'watch:myapp-angular-templates', 'watch:myapp-static-assets'], cb);
});

gulp.task('run-mock', function (cb) {
    runSequence('build-mock', ['watch', 'webserver'], cb);
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

gulp.task('myapp-js', function() {
    return browserifyBuild({
        browserifier: config.deployMocks ? browserifiers.forMockApp : browserifiers.forApp,
        outputFileName: config.paths.appDestName
    });
});

gulp.task('watch:myapp-js', function () {
    var getBrowserifier = config.deployMocks ? browserifiers.forMockApp : browserifiers.forApp;

    var watchifier = function(opts) {
        return watchify(getBrowserifier(opts))
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

gulp.task('myapp-mock-js', function() {
    return browserifyBuild({
        browserifier: browserifiers.forMocks,
        outputFileName: config.paths.mockDestName
    });
});

gulp.task('watch:myapp-mock-js', function () {
    var watchifier = function(opts) {
        return watchify(browserifiers.forMocks(opts))
            .on('log', gutil.log.bind(gutil.log, "Watchify (app):"))
            .on('update', build);
    };

    return build();

    function build() {
        return browserifyBuild({
            browserifier: watchifier,
            outputFileName: config.paths.mockDestName
        });
    }
});

/*
 * To make it easy to cache angular templates and to copy static assets,
 * modules must be careful to use the correct base path in their globs!
 */

gulp.task('myapp-angular-templates', function () {
    var merged = mergeStream();
    var getProperty = _.property(['myapp-assets', 'angular-templates']);

    var modules = _.concat(['./'], config.modules); // include main app
    _.each(modules, function(modulePath) {
        var packageJson = require(modulePath == './' ? './package.json' : path(modulePath, 'package.json'));
        if (getProperty(packageJson)) {
            var glob = path(modulePath == './' ? '' : 'node_modules', modulePath, getProperty(packageJson));
            merged.add(gulp.src(glob));
        }
    });

    return merged.pipe(ngTemplateCache({
            module: "mainApp",
            moduleSystem: "IIFE",
            transformUrl: function (url) {
                return url.replace(path(__dirname, '/'), '');
            }
        })
    ).pipe(gulp.dest(config.paths.build));
});

gulp.task('watch:myapp-angular-templates', function () {
    var getProperty = _.property(['myapp-assets', 'angular-templates']);

    var modules = _.concat(['./'], config.modules); // include main app
    var globs = [];
    _.each(modules, function(modulePath) {
        var packageJson = require(modulePath == './' ? './package.json' : path(modulePath, 'package.json'));
        if (getProperty(packageJson)) {
            globs.push(path(modulePath == './' ? '' : 'node_modules', modulePath, getProperty(packageJson)));
        }
    });

    gulp.watch(globs, ['myapp-angular-templates']);
});


gulp.task('myapp-static-assets', function () {
    var merged = mergeStream();
    var getProperty = _.property(['myapp-assets', 'static']);

    var modules = _.concat(['./'], config.modules); // include main app's templates in processing
    _.each(modules, function(modulePath) {
        var packageJson = require(modulePath == './' ? './package.json' : path(modulePath, 'package.json'));
        if (getProperty(packageJson)) {
            var glob = path(modulePath == './' ? '' : 'node_modules', modulePath, getProperty(packageJson));
            merged.add(gulp.src(glob));
        }
    });

    return merged.pipe(gulp.dest(config.paths.build));
});

gulp.task('watch:myapp-static-assets', function () {
    var getProperty = _.property(['myapp-assets', 'static']);

    var modules = _.concat(['./'], config.modules); // include main app's templates in processing
    var globs = [];
    _.each(modules, function(modulePath) {
        var packageJson = require(modulePath == './' ? './package.json' : path(modulePath, 'package.json'));
        if (getProperty(packageJson)) {
            globs.push(path(modulePath == './' ? '' : 'node_modules', modulePath, getProperty(packageJson)));
        }
    });

    gulp.watch(globs, ['myapp-static-assets']);
});



gulp.task('webserver', function() {
    gulp.src(config.paths.build)
        .pipe(webserver({
            port: 8080,
            livereload: true
        }));
});