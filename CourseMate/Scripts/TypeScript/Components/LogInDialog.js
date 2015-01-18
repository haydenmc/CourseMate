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
        this.working = false;
        this.title = "Hi.";

        // Generate log-in form
        var intro = document.createElement("p");
        intro.classList.add("logIn");
        intro.innerHTML = "Please log in.";
        var form = document.createElement("form");
        form.classList.add("logIn");
        form.innerHTML = '<input type="text" name="email" placeholder="email address" />' + '<input type= "password" name= "password" placeholder="password" />';
        form.addEventListener("submit", function (evt) {
            evt.preventDefault();
            _this.submit();
        });
        this.contentNodes = [intro, form];

        // Add actions
        this.addAction({
            name: "Register", method: function () {
                if (_this.working) {
                    return;
                }
                new RegisterDialog(_this.Application).show();
                _this.hide();
            }
        });
        this.addAction({
            name: "Log In", method: function () {
                if (_this.working) {
                    return;
                }
                _this.submit();
            }
        });
    }
    LogInDialog.prototype.submit = function () {
        var _this = this;
        this.working = true;
        var inputElements = this.baseElement.querySelectorAll("input");
        var username = inputElements[0].value;
        var password = inputElements[1].value;
        this.Application.DataSource.authenticate(username, password).then(function (success) {
            _this.Application.loggedIn();
            _this.working = false;
            _this.hide();
        }, function (error) {
            alert("There was an error authenticating: " + error);
            _this.working = false;
        });
    };
    return LogInDialog;
})(SmallDialog);
//# sourceMappingURL=LogInDialog.js.map
