'use strict';

var angular = require('angular'); // must be loaded first
require('angular-ui-router');

angular
    .module('mainApp', [
        'ui.router',
        require('@atorma/multimodule-angular-app-navigation').name,
        require('@atorma/multimodule-angular-app-app-1').name,
        require('@atorma/multimodule-angular-app-app-2').name
    ])
    .config(configureRouting);


function configureRouting($urlRouterProvider) {
    $urlRouterProvider.otherwise("/app1");
}