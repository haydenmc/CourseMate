class CourseListing extends Component {
	constructor(app: App) {
		this.componentId = "CourseListing";
		this._title = "Overview";
		super(app);
		this.fetchCourseList();
	}

	public addCourseListing(course: Course, last?: boolean) {
		var listElement = <HTMLUListElement>this.baseElement.querySelector("ul.courses");
		var courseElement = document.createElement("li");
		courseElement.classList.add("animated");
		courseElement.classList.add("anim-shove-in-right");
		courseElement.innerHTML = '<div class="code">' + Util.escapeStringHtml(course.CourseCode) + '</div><div class="title">' + Util.escapeStringHtml(course.CourseName) + '</div>';
		courseElement.style.backgroundColor = course.ColorCode;
		courseElement.addEventListener("click",() => {
			this.Application.navigateTo(new CourseDetails(this.Application, course));
		});
		if (typeof last !== 'undefined' && last == true) {
			listElement.insertBefore(courseElement, listElement.lastChild);
		} else {
			listElement.insertBefore(courseElement, listElement.firstChild);
		}
	}

	public fetchCourseList() {
		this.Application.DataSource.fetchCourses().then((courses) => {
			for (var i = 0; i < courses.length; i++) {
				((course: Course) => {
					this.addCourseListing(course);
				})(courses[i]);
			}
			// Add placeholder for adding new courses
			var listElement = <HTMLUListElement>this.baseElement.querySelector("ul.courses");
			var newElement = document.createElement("li");
			newElement.classList.add("new");
			newElement.innerHTML = "New Course";
			newElement.addEventListener("click",() => {
				new AddCourseDialog(this.Application, this).show();
			});
			listElement.appendChild(newElement);
		},(error) => {
				alert("Error fetching courses: " + error);
			});
	}

	public show() {
		super.show();
		this.Application.TopBar.BgColor = "";
	}
}