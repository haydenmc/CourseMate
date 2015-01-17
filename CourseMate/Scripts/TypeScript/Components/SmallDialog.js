var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SmallDialog = (function (_super) {
    __extends(SmallDialog, _super);
    function SmallDialog(app) {
        this.componentId = "SmallDialog";
        _super.call(this, app);
    }
    Object.defineProperty(SmallDialog.prototype, "title", {
        get: function () {
            return this.baseElement.querySelector("div.container header").innerHTML;
        },
        // Title
        set: function (str) {
            this.baseElement.querySelector("div.container header").innerHTML = str;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(SmallDialog.prototype, "contentNodes", {
        get: function () {
            return [].slice.call(this.baseElement.querySelector("div.container div.content").childNodes);
        },
        // Content
        set: function (nodes) {
            var contentNode = this.baseElement.querySelector("div.container div.content");
            contentNode.innerHTML = '';
            for (var i in nodes) {
                contentNode.appendChild(nodes[i]);
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(SmallDialog.prototype, "contentHtml", {
        get: function () {
            return this.baseElement.querySelector("div.container div.content").innerHTML;
        },
        set: function (html) {
            this.baseElement.querySelector("div.container div.content").innerHTML = html;
        },
        enumerable: true,
        configurable: true
    });

    SmallDialog.prototype.addAction = function (action) {
        var actionButton = document.createElement("a");
        actionButton.innerHTML = action.name;
        actionButton.addEventListener("click", action.method);
        var actionListItem = document.createElement("li");
        actionListItem.appendChild(actionButton);
        var actionsListElement = (this.baseElement.querySelector("footer ul.actions"));
        actionsListElement.appendChild(actionListItem);

        var listItems = actionsListElement.querySelectorAll("li");
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].style.width = ((1 / listItems.length) * 100) + "%";
        }
    };
    return SmallDialog;
})(Component);
//# sourceMappingURL=SmallDialog.js.map
