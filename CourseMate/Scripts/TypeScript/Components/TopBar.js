var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TopBar = (function (_super) {
    __extends(TopBar, _super);
    function TopBar(app) {
        this.componentId = "TopBar";
        _super.call(this, app);
        this.UserDisplayName = app.DataSource.authInfo.userName;
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
            Animator.animateElement(titleElement, "anim-shove-out-right").then(function () {
                titleElement.innerHTML = Util.escapeStringHtml(title);
                Animator.animateElement(titleElement, "anim-shove-in-left");
            });
        },
        enumerable: true,
        configurable: true
    });
    return TopBar;
})(Component);
//# sourceMappingURL=TopBar.js.map