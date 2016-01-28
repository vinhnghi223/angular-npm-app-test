var _ = require('lodash');

module.exports = function(thingsDataService, $q) {
    var vm = this;

    vm.init = init;

    init();

    function init() {
        return $q.all({
            things: thingsDataService.findAll()
        }).then(function(data) {
            _.extend(vm, data);
        });
    }
};