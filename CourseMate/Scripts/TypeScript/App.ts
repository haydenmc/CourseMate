/**
 * This class handles the app lifecycle.
 */
class App {
	public static instance: App; // Singleton
	private _dataSource: DataSource;
	public get DataSource(): DataSource {
		return this._dataSource;
	}
	private _topBar: TopBar;
	public get TopBar(): TopBar {
		return this._topBar;
	}
	private _backStack: Array<Component>;
	public get BackStack(): Array<Component> {
		return this._backStack;
	}
	constructor() {
		App.instance = this;
		this._dataSource = new DataSource();
		this._backStack = new Array<Component>();
	}

	public navigateBack(): void {
		if (this.BackStack.length > 1) {
			this.BackStack[this.BackStack.length - 1].hide();
			this._backStack.splice(-1, 1);
			this.BackStack[this.BackStack.length - 1].show();
			this.TopBar.PageTitle = this.BackStack[this.BackStack.length - 1].Title;
		}
	}

	public navigateTo(component: Component): void {
		// Hide the previous stack item.
		if (this.BackStack.length > 0) {
			this.BackStack[this.BackStack.length - 1].hide();
		}
		this.BackStack.push(component);
		this.TopBar.PageTitle = component.Title;
		component.show();
	}

	public run(): void {
		// Here we go!
		// Test dialog
		var d = new LogInDialog(this);
		d.show();
	}

	// This is called after the user has successfully logged in
	public loggedIn(): void {
		this._topBar = new TopBar(this);
		this.TopBar.show();
		this.navigateTo(new CourseListing(this));
	}
}

window.addEventListener("load",() => {
	new App().run();
});