var _ = require('lodash');

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

module.exports = function($q) {

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

};


