module.exports = function() {
    var vm = this;

    vm.init = init;

    init();

    function init() {
        vm.message = "App 1 View2Ctrl presents to you a random number " + Math.random();
    }
};