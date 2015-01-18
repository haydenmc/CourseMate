var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AddCourseDialog = (function (_super) {
    __extends(AddCourseDialog, _super);
    function AddCourseDialog(app, listing) {
        var _this = this;
        _super.call(this, app);
        this.working = false;
        if (typeof listing !== 'undefined') {
            this.courseListing = listing;
        }
        this.title = "Add";
        var form = document.createElement("form");
        form.classList.add("logIn");
        form.innerHTML = '<input type="text" name="courseCode" placeholder="MATH265" />' + '<input type="text" name= "courseName" placeholder="Linear Algebra" />';
        form.addEventListener("submit", function (evt) {
            evt.preventDefault();
            _this.submit();
        });
        this.contentNodes = [form];

        // Add actions
        this.addAction({
            name: "Cancel", method: function () {
                if (_this.working) {
                    return;
                }
                _this.hide();
            }
        });
        this.addAction({
            name: "Add", method: function () {
                if (_this.working) {
                    return;
                }
                _this.submit();
            }
        });
    }
    AddCourseDialog.prototype.submit = function () {
        var _this = this;
        this.working = true;
        var inputElements = this.baseElement.querySelectorAll("input");
        var courseCode = inputElements[0].value;
        var courseName = inputElements[1].value;
        this.Application.DataSource.postCourse(courseCode, courseName).then(function (success) {
            if (typeof _this.courseListing !== 'undefined') {
                _this.courseListing.addCourseListing(success, true);
            }
            _this.working = false;
            _this.hide();
        }, function (error) {
            alert("There was an error adding this course: " + error);
            _this.working = false;
        });
    };
    return AddCourseDialog;
})(SmallDialog);
//# sourceMappingURL=AddCourseDialog.js.map
