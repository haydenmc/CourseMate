class TopBar extends Component {
	public get UserDisplayName(): string {
		return (<HTMLElement>this.baseElement.querySelector("div.user span")).innerHTML;
	}
	public set UserDisplayName(name: string) {
		(<HTMLElement>this.baseElement.querySelector("div.user span")).innerHTML = Util.escapeStringHtml(name);
	}

	public get PageTitle(): string {
		return (<HTMLElement>this.baseElement.querySelector("h1.pageTitle")).innerHTML;
	}

	public set PageTitle(title: string) {
		var titleElement = <HTMLElement>this.baseElement.querySelector("h1.pageTitle");
		Animator.animateElement(titleElement, "anim-shove-out-right").then(() => {
			titleElement.innerHTML = Util.escapeStringHtml(title);
			Animator.animateElement(titleElement, "anim-shove-in-left");
		});
	}

	constructor(app: App) {
		this.componentId = "TopBar";
		super(app);
		this.UserDisplayName = app.DataSource.authInfo.userName;
	}
} 