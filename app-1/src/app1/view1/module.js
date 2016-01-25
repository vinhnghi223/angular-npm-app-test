'use strict';

var angular = require('angular');
require('angular-ui-router');

module.exports = angular.module('app1.view1', ['ui.router'])
    .config(routing);


function routing($stateProvider) {
    $stateProvider.state('app1.view1', {
        url: "", // default for this app
        templateUrl: 'app1/view1/view1.prt.html'
    });
}