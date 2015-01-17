var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LogInDialog = (function (_super) {
    __extends(LogInDialog, _super);
    function LogInDialog(app) {
        var _this = this;
        _super.call(this, app);
        this.title = "Hi.";

        // Generate log-in form
        var intro = document.createElement("p");
        intro.classList.add("logIn");
        intro.innerHTML = "Please log in.";
        var form = document.createElement("form");
        form.classList.add("logIn");
        form.innerHTML = '<input type="text" name="email" placeholder="email address" />' + '<input type= "password" name= "password" placeholder="password" />';
        form.addEventListener("submit", function () {
            _this.submit();
        });
        this.contentNodes = [intro, form];

        // Add actions
        this.addAction({
            name: "Register", method: function () {
                alert("not implemented.");
            }
        });
        this.addAction({
            name: "Log In", method: function () {
                _this.submit();
            }
        });
    }
    LogInDialog.prototype.submit = function () {
        alert("Submitted!");
    };
    return LogInDialog;
})(SmallDialog);
//# sourceMappingURL=LogInDialog.js.map
