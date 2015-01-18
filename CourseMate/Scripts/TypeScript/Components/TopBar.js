var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TopBar = (function (_super) {
    __extends(TopBar, _super);
    function TopBar(app) {
        var _this = this;
        this._canGoBack = false;
        this.componentId = "TopBar";
        _super.call(this, app);
        this.UserDisplayName = app.DataSource.authInfo.userName;
        this.baseElement.querySelector("button.backButton").addEventListener("click", function () {
            _this.Application.navigateBack();
        });
    }
    Object.defineProperty(TopBar.prototype, "UserDisplayName", {
        get: function () {
            return this.baseElement.querySelector("div.user span").innerHTML;
        },
        set: function (name) {
            this.baseElement.querySelector("div.user span").innerHTML = Util.escapeStringHtml(name);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopBar.prototype, "PageTitle", {
        get: function () {
            return this.baseElement.querySelector("h1.pageTitle").innerHTML;
        },
        set: function (title) {
            var titleElement = this.baseElement.querySelector("h1.pageTitle");
            Animator.animateElement(titleElement, "anim-shove-out-left").then(function () {
                titleElement.innerHTML = Util.escapeStringHtml(title);
                Animator.animateElement(titleElement, "anim-shove-in-right");
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopBar.prototype, "BgColor", {
        get: function () {
            return this.baseElement.style.backgroundColor;
        },
        set: function (color) {
            this.baseElement.style.backgroundColor = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TopBar.prototype, "canGoBack", {
        get: function () {
            return this._canGoBack;
        },
        set: function (can) {
            this._canGoBack = can;
        },
        enumerable: true,
        configurable: true
    });
    return TopBar;
})(Component);
//# sourceMappingURL=TopBar.js.map