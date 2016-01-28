'use strict';

var angular = require('angular');
require('angular-ui-router');

module.exports = angular.module('things', [
        'ui.router'
    ])
    // Do we want to name our objects like below (writing injections is easier)
    // or like this: 'things.dataService', 'things.ListController, ...
    .factory('thingsDataService', require('./data.service'))
    .controller('ThingsListController', require('./list.controller'))
    .controller('ThingsDetailController', require('./detail.controller'))
    .config(routing);


function routing($stateProvider) {
    $stateProvider
        .state('things', {
            url: "/things",
            templateUrl: 'things/list.prt.html',
            controller: 'ThingsListController',
            controllerAs: 'vm'
        })
        .state('thingsDetail', {
            url: "/things/:id",
            templateUrl: 'things/detail.prt.html',
            controller: 'ThingsDetailController',
            controllerAs: 'vm'
        })
    ;

}