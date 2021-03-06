'use strict';

var angular = require('angular');
require('angular-ui-router');

module.exports = angular.module('app1.view2', ['ui.router'])
    .controller('app1.view2.View2Ctrl', require('./View2Ctrl'))
    .config(routing);


function routing($stateProvider) {
    $stateProvider.state('app1.view2', {
        url: '/view2',
        templateUrl: 'app1/view2/view2.prt.html',
        controller: 'app1.view2.View2Ctrl as vm'
    });
}