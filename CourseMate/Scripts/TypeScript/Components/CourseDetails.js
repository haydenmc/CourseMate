var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CourseDetails = (function (_super) {
    __extends(CourseDetails, _super);
    function CourseDetails(app, course) {
        this.componentId = "CourseDetails";
        this.course = course;
        this._title = course.CourseCode;
        _super.call(this, app);
    }
    CourseDetails.prototype.show = function () {
        _super.prototype.show.call(this);
        this.Application.TopBar.BgColor = this.course.ColorCode;
    };
    return CourseDetails;
})(Component);
//# sourceMappingURL=CourseDetails.js.map