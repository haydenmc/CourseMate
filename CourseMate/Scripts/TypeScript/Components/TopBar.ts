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
		Animator.animateElement(titleElement, "anim-shove-out-left").then(() => {
			titleElement.innerHTML = Util.escapeStringHtml(title);
			Animator.animateElement(titleElement, "anim-shove-in-right");
		});
	}

	public get BgColor(): string {
		return this.baseElement.style.backgroundColor;
	}

	public set BgColor(color: string) {
		this.baseElement.style.backgroundColor = color;
	}

	private _canGoBack: boolean;
	public get canGoBack(): boolean {
		return this._canGoBack;
	}
	public set canGoBack(can: boolean) {
		this._canGoBack = can;
	}
	
	constructor(app: App) {
		this._canGoBack = false;
		this.componentId = "TopBar";
		super(app);
		this.UserDisplayName = app.DataSource.authInfo.userName;
		this.baseElement.querySelector("button.backButton").addEventListener("click",() => {
			this.Application.navigateBack();
		});
	}
} 