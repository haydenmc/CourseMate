/**
* This class handles the app lifecycle.
*/
var App = (function () {
    function App() {
        App.instance = this;
        this._dataSource = new DataSource();
    }
    Object.defineProperty(App.prototype, "DataSource", {
        get: function () {
            return this._dataSource;
        },
        enumerable: true,
        configurable: true
    });

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
