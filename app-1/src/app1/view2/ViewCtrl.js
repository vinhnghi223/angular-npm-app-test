module.exports = function() {
    var vm = this;

    vm.init = init;

    init();

    function init() {
        vm.message = "App 1 view 2 loaded with random number " + Math.random();
    }
};