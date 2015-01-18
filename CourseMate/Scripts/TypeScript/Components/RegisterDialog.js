var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RegisterDialog = (function (_super) {
    __extends(RegisterDialog, _super);
    function RegisterDialog(app) {
        var _this = this;
        _super.call(this, app);
        this.working = false;
        this.title = "New?";

        // Generate regiter form
        var form = document.createElement("form");
        form.classList.add("logIn");
        form.innerHTML = '<input type="text" name="email" placeholder="email address" />' + '<input type="password" name= "password" placeholder="password" />' + '<input type="password" name= "confirmPassword" placeholder="confirm password" />';
        form.addEventListener("submit", function () {
            _this.submit();
        });
        this.contentNodes = [form];

        // Add actions
        this.addAction({
            name: "Cancel", method: function () {
                if (_this.working) {
                    return;
                }
                new LogInDialog(_this.Application).show();
                _this.hide();
            }
        });
        this.addAction({
            name: "Register", method: function () {
                if (_this.working) {
                    return;
                }
                _this.submit();
            }
        });
    }
    RegisterDialog.prototype.submit = function () {
        var _this = this;
        this.working = true;
        var inputElements = this.baseElement.querySelectorAll("input");
        var email = inputElements[0].value;
        var password = inputElements[1].value;
        var confirmPassword = inputElements[2].value;
        this.Application.DataSource.register(email, password, confirmPassword).then(function (result) {
            alert("Success!");
            _this.working = false;
        }, function (error) {
            alert("An error occured while processing registration: " + error);
            _this.working = false;
        });
    };
    return RegisterDialog;
})(SmallDialog);
//# sourceMappingURL=RegisterDialog.js.map
