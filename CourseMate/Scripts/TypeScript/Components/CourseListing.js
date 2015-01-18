var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CourseListing = (function (_super) {
    __extends(CourseListing, _super);
    function CourseListing(app) {
        this.componentId = "CourseListing";
        this._title = "Welcome";
        _super.call(this, app);
        this.fetchCourseList();
    }
    CourseListing.prototype.fetchCourseList = function () {
        var _this = this;
        this.Application.DataSource.fetchCourses().then(function (courses) {
            var listElement = _this.baseElement.querySelector("ul.courses");

            // First, add placeholder for adding new courses
            var newElement = document.createElement("li");
            newElement.classList.add("new");
            newElement.innerHTML = "New Course";
            newElement.addEventListener("click", function () {
                new AddCourseDialog(_this.Application).show();
            });
            listElement.appendChild(newElement);
            for (var i = 0; i < courses.length; i++) {
                (function (course) {
                    var courseElement = document.createElement("li");
                    courseElement.innerHTML = course.CourseName;
                    listElement.appendChild(courseElement);
                })(courses[i]);
            }
        }, function (error) {
            alert("Error fetching courses: " + error);
        });
    };
    return CourseListing;
})(Component);
//# sourceMappingURL=CourseListing.js.map
