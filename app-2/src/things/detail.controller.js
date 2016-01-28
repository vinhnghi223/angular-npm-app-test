module.exports = function($stateParams, thingsDataService, $q) {
    var vm = this;

    vm.init = init;

    init();

    function init() {
        return $q.all({
            thing: thingsDataService.findById($stateParams.id)
        }).then(function(data) {
            _.extend(vm, data);
        });
    }
};