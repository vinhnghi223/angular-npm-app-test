module.exports = function() {
    var vm = this;

    vm.init = init;

    init();

    function init() {
        vm.message = "Greetings from App 1 View1Ctrl!";
    }
};