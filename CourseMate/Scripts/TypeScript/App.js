/**
* This class handles the app lifecycle.
*/
var App = (function () {
    function App() {
        App.instance = this;
    }
    App.prototype.run = function () {
        // Here we go!
        // Test dialog
        var d = new LogInDialog(this);
        d.show();
    };
    return App;
})();

window.addEventListener("load", function () {
    new App().run();
});
//# sourceMappingURL=App.js.map
