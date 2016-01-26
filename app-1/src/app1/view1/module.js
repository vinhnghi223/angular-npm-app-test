'use strict';

var angular = require('angular');
require('angular-ui-router');

module.exports = angular.module('app1.view1', ['ui.router'])
    .controller('app1.view1.View1Ctrl', require('./View1Ctrl'))
    .config(routing);


function routing($stateProvider) {
    $stateProvider.state('app1.view1', {
        url: '/view1',
        templateUrl: 'app1/view1/view1.prt.html',
        controller: 'app1.view1.View1Ctrl as vm'
    });
}