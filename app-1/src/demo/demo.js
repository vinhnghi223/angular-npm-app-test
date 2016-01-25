'use strict';

var angular = require('angular'); // must be loaded first
require('angular-ui-router');

angular
    .module('demo', [
        'ui.router',
        require('../app1/module').name
    ])
    .config(configureRouting);


function configureRouting($urlRouterProvider) {
    $urlRouterProvider.otherwise("/app1");
}