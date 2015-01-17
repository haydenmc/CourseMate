/**
 * This class handles the app lifecycle.
 */
class App {
	public static instance: App; // Singleton

	constructor() {
		App.instance = this;
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