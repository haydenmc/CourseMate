/**
 * This class handles the app lifecycle.
 */
var App = (function () {
    function App() {
        App.instance = this;
        this._dataSource = new DataSource();
        this._backStack = new Array();
    }
    Object.defineProperty(App.prototype, "DataSource", {
        get: function () {
            return this._dataSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "TopBar", {
        get: function () {
            return this._topBar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "BackStack", {
        get: function () {
            return this._backStack;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.navigateBack = function () {
        if (this.BackStack.length > 1) {
            this.BackStack[this.BackStack.length - 1].hide();
            this._backStack.splice(-1, 1);
            this.BackStack[this.BackStack.length - 1].show();
            this.TopBar.PageTitle = this.BackStack[this.BackStack.length - 1].Title;
        }
    };
    App.prototype.navigateTo = function (component) {
        // Hide the previous stack item.
        if (this.BackStack.length > 0) {
            this.BackStack[this.BackStack.length - 1].hide();
        }
        this.BackStack.push(component);
        this.TopBar.PageTitle = component.Title;
        component.show();
    };
    App.prototype.run = function () {
        // Here we go!
        // Test dialog
        var d = new LogInDialog(this);
        d.show();
    };
    // This is called after the user has successfully logged in
    App.prototype.loggedIn = function () {
        this._topBar = new TopBar(this);
        this.TopBar.show();
        this.navigateTo(new CourseListing(this));
    };
    return App;
})();
window.addEventListener("load", function () {
    new App().run();
});
//# sourceMappingURL=App.js.map