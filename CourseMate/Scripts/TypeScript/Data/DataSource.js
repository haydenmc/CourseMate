var DataSource = (function () {
    function DataSource() {
    }
    Object.defineProperty(DataSource.prototype, "authInfo", {
        get: function () {
            return this._authInfo;
        },
        enumerable: true,
        configurable: true
    });

    DataSource.prototype.authenticate = function (email, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            JsonRequest.httpPost('/Token', { Username: email, Password: password, grant_type: "password" }).then(function (success) {
                _this._authInfo = success;
                resolve(success);
            }, function (error) {
                reject(error);
            });
        });
    };

    DataSource.prototype.register = function (email, password, confirmPassword) {
        return new Promise(function (resolve, reject) {
            JsonRequest.httpPost(DataSource.APIURL + '/Account/Register', {
                Email: email,
                Password: password,
                ConfirmPassword: confirmPassword
            }).then(function (success) {
                resolve("Authenticated");
            }, function (error) {
                reject();
            });
        });
    };

    DataSource.prototype.fetchCourses = function () {
        return JsonRequest.httpGet(DataSource.APIURL + '/Courses', this.authInfo.access_token);
    };

    DataSource.prototype.postCourse = function (courseCode, courseName) {
        return JsonRequest.httpPost(DataSource.APIURL + '/Courses', { CourseCode: courseCode, CourseName: courseName }, this.authInfo.access_token);
    };
    DataSource.APIURL = "/api";
    return DataSource;
})();
//# sourceMappingURL=DataSource.js.map
