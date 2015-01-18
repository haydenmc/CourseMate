class CourseListing extends Component {
	constructor(app: App) {
		this.componentId = "CourseListing";
		this._title = "Welcome";
		super(app);
		this.fetchCourseList();
	}

	public fetchCourseList() {
		this.Application.DataSource.fetchCourses().then((courses) => {
			var listElement = <HTMLUListElement>this.baseElement.querySelector("ul.courses");
			// First, add placeholder for adding new courses
			var newElement = document.createElement("li");
			newElement.classList.add("new");
			newElement.innerHTML = "New Course";
			newElement.addEventListener("click",() => {
				new AddCourseDialog(this.Application).show();
			});
			listElement.appendChild(newElement);
			for (var i = 0; i < courses.length; i++) {
				((course: Course) => {
					var courseElement = document.createElement("li");
					courseElement.innerHTML = '<div class="code">' + course.CourseCode + '</div><div class="title">' + course.CourseName + '</div>';
					courseElement.style.backgroundColor = course.ColorCode;
					listElement.appendChild(courseElement);
				})(courses[i]);
			}
		},(error) => {
				alert("Error fetching courses: " + error);
			});
	}
}