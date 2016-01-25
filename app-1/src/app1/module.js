'use strict';

var angular = require('angular');
require('angular-ui-router');

module.exports = angular.module('app1', [
    'ui.router',
    require('./view1/module').name,
    require('./view2/module').name
]).config(routing);


function routing($stateProvider) {
    $stateProvider.state('app1', {
        abstract: true,
        url: "/app1",
        templateUrl: 'app1/app1.prt.html'
    });
}