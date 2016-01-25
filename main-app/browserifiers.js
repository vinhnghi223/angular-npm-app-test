"use strict";

var browserify = require('browserify');
var watchify = require('watchify');
var _ = require('lodash');

var config = require('./config');

var libs = ['angular', 'angular-ui-router', 'lodash'];

module.exports = {
    forLibs: forLibs,
    forApp: forApp
};

function forLibs(browserifyOpts) {
    return getInstance(browserifyOpts)
        .require(libs);
}

function forApp(browserifyOpts) {
    return getInstance(browserifyOpts)
        .add(config.paths.appSourceMain)
        .external(libs);
}

function getInstance(additionalOpts) {
    var opts = _.extend({}, additionalOpts, watchify.args);
    return browserify(opts);
}

