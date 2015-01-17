class LogInDialog extends SmallDialog {
	constructor(app: App) {
		super(app);
		this.title = "Hi.";
		// Generate log-in form
		var intro = document.createElement("p");
		intro.classList.add("logIn");
		intro.innerHTML = "Please log in.";
		var form = document.createElement("form");
		form.classList.add("logIn");
		form.innerHTML = '<input type="text" name="email" placeholder="email address" />'
		+ '<input type= "password" name= "password" placeholder="password" />';
		form.addEventListener("submit",() => {
			this.submit();
		});
		this.contentNodes = [intro, form];
		// Add actions
		this.addAction({
			name: "Register", method: () => {
				alert("not implemented.");
			}
		});
		this.addAction({
			name: "Log In", method: () => {
				this.submit();
			}
		});
	}

	public submit(): void {
		alert("Submitted!");
	}
} 