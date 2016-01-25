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
var browserifiers = require('./browserifiers');



gulp.task('clean', function () {
    return del(config.paths.build + '/**', {force: true});
});

gulp.task('build', function (cb) {
    runSequence('clean',
        [
            'js-libs',
            'js-app',
            'html',
            'resources',
            'lib-resources',
            'angular-templates',
            'angular-partials'
        ],
        cb
    );
});

gulp.task('watch', function (cb) {
    runSequence(['watch:js-app', 'watch:html', 'watch:resources'], cb);
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


gulp.task('html', function () {
    return gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('watch:html', function () {
    return gulp.watch(config.paths.html, ['html']);
});


gulp.task('resources', function () {
    return gulp.src(config.paths.resources)
        .pipe(gulp.dest(config.paths.build + '/resources'));
});

gulp.task('watch:resources', function () {
    return gulp.watch(config.paths.resources, ['resources']);
});


gulp.task('lib-resources', function () {
    return gulp.src(config.paths.libResources)
        .pipe(gulp.dest(config.paths.build + '/resources'));
});


gulp.task('angular-templates', function () {
    var merged = mergeStream();
    var getProperty = _.property(['myapp-assets', 'angular-templates']);
    _.each(config.modules, function(modulePath) {
        var packageJson = require(path(modulePath, 'package.json'));
        if (!getProperty(packageJson)) return;

        var templateGlob = path('./node_modules', modulePath, getProperty(packageJson));
        var basePath = path('./node_modules', modulePath, 'src');  // hard-coded 'src' -- bad, alternatives?
        merged.add(gulp.src(templateGlob, {base: basePath}));
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

gulp.task('angular-partials', function () {
    var merged = mergeStream();
    var getProperty = _.property(['myapp-assets', 'angular-partials']);
    _.each(config.modules, function(modulePath) {
        var packageJson = require(path(modulePath, 'package.json'));
        if (!getProperty(packageJson)) return;

        var templateGlob = path('node_modules', modulePath, getProperty(packageJson));
        var basePath =  path('node_modules', modulePath, 'src');  // hard-coded 'src' -- bad, alternatives?
        merged.add(gulp.src(templateGlob, {base: basePath}));
    });

    return merged.pipe(gulp.dest(config.paths.build));
});


gulp.task('webserver', function() {
    gulp.src(config.paths.build)
        .pipe(webserver({
            port: 8080,
            livereload: true
        }));
});