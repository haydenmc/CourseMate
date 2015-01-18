class AddCourseDialog extends SmallDialog {
	private working: boolean = false;
	private courseListing: CourseListing;

	constructor(app: App, listing?: CourseListing) {
		super(app);
		if (typeof listing !== 'undefined') {
			this.courseListing = listing;
		}
		this.title = "Add";
		var form = document.createElement("form");
		form.classList.add("logIn");
		form.innerHTML = '<input type="text" name="courseCode" placeholder="MATH265" />'
		+ '<input type="text" name= "courseName" placeholder="Linear Algebra" />';
		form.addEventListener("submit",(evt) => {
			evt.preventDefault();
			this.submit();
		});
		this.contentNodes = [form];
		// Add actions
		this.addAction({
			name: "Cancel", method: () => {
				if (this.working) {
					return;
				}
				this.hide();
			}
		});
		this.addAction({
			name: "Add", method: () => {
				if (this.working) {
					return;
				}
				this.submit();
			}
		});
	}

	public submit(): void {
		this.working = true;
		var inputElements = this.baseElement.querySelectorAll("input");
		var courseCode = (<HTMLInputElement>inputElements[0]).value;
		var courseName = (<HTMLInputElement>inputElements[1]).value;
		this.Application.DataSource.postCourse(courseCode, courseName).then((success) => {
			if (typeof this.courseListing !== 'undefined') {
				this.courseListing.addCourseListing(success, true);
			}
			this.working = false;
			this.hide();
		},(error) => {
				alert("There was an error adding this course: " + error);
				this.working = false;
			});
	}
} 