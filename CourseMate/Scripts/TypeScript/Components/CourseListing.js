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
        this._title = "Overview";
        _super.call(this, app);
        this.fetchCourseList();
    }
    CourseListing.prototype.addCourseListing = function (course, last) {
        var _this = this;
        var listElement = this.baseElement.querySelector("ul.courses");
        var courseElement = document.createElement("li");
        courseElement.classList.add("animated");
        courseElement.classList.add("anim-shove-in-right");
        courseElement.innerHTML = '<div class="code">' + Util.escapeStringHtml(course.CourseCode) + '</div><div class="title">' + Util.escapeStringHtml(course.CourseName) + '</div>';
        courseElement.style.backgroundColor = course.ColorCode;
        courseElement.addEventListener("click", function () {
            _this.Application.navigateTo(new CourseDetails(_this.Application, course));
        });
        if (typeof last !== 'undefined' && last == true) {
            listElement.insertBefore(courseElement, listElement.lastChild);
        }
        else {
            listElement.insertBefore(courseElement, listElement.firstChild);
        }
    };
    CourseListing.prototype.fetchCourseList = function () {
        var _this = this;
        this.Application.DataSource.fetchCourses().then(function (courses) {
            for (var i = 0; i < courses.length; i++) {
                (function (course) {
                    _this.addCourseListing(course);
                })(courses[i]);
            }
            // Add placeholder for adding new courses
            var listElement = _this.baseElement.querySelector("ul.courses");
            var newElement = document.createElement("li");
            newElement.classList.add("new");
            newElement.innerHTML = "New Course";
            newElement.addEventListener("click", function () {
                new AddCourseDialog(_this.Application, _this).show();
            });
            listElement.appendChild(newElement);
        }, function (error) {
            alert("Error fetching courses: " + error);
        });
    };
    CourseListing.prototype.show = function () {
        _super.prototype.show.call(this);
        this.Application.TopBar.BgColor = "";
    };
    return CourseListing;
})(Component);
//# sourceMappingURL=CourseListing.js.map