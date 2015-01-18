class CourseDetails extends Component {
	public course: Course;
	constructor(app: App, course: Course) {
		this.componentId = "CourseDetails";
		this.course = course;
		this._title = course.CourseCode;
		super(app);
	}

	public show() {
		super.show();
		this.Application.TopBar.BgColor = this.course.ColorCode;
	}
}