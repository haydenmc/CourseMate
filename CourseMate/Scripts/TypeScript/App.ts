/**
 * This class handles the app lifecycle.
 */
class App {
	public static instance: App; // Singleton
	private _dataSource: DataSource;
	public get DataSource(): DataSource {
		return this._dataSource;
	}
	constructor() {
		App.instance = this;
		this._dataSource = new DataSource();
	}

	public run(): void {
		// Here we go!
		// Test dialog
		var d = new LogInDialog(this);
		d.show();
	}
}

window.addEventListener("load",() => {
	new App().run();
});