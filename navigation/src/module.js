'use strict';

var angular = require('angular');
require('angular-ui-router');

module.exports = angular.module('navigation', ['ui.router'])
    .directive('navigation', require('./navigation-directive'));