var _ = require('lodash');
var angular = require('angular');

var allThings = [
    {
        id: 1,
        name: "[Mock] This thing",
        description: "Mock data"
    },
    {
        id: 2,
        name: "[Mock] That thing",
        description: "Mock data"
    }
];

angular.module('things')
    .factory('thingsDataService', thingsDataService);

function thingsDataService($q) {

    return {
        findAll: findAllThings,
        findById: findById
    };


    function findAllThings() {
        return $q.when(_.cloneDeep(allThings));
    }

    function findById(id) {
        var thing = _.find(allThings, {'id': _.toNumber(id)});
        if (thing) {
            return $q.when(_.cloneDeep(thing));
        } else {
            return $q.reject({status: 404});
        }
    }

}


