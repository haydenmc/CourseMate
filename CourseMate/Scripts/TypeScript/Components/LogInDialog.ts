﻿class LogInDialog extends SmallDialog {
	private working: boolean = false;

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
		form.addEventListener("submit",(evt) => {
			evt.preventDefault();
			this.submit();
		});
		this.contentNodes = [intro, form];
		// Add actions
		this.addAction({
			name: "Register", method: () => {
				if (this.working) {
					return;
				}
				new RegisterDialog(this.Application).show();
				this.hide();
			}
		});
		this.addAction({
			name: "Log In", method: () => {
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
		var username = (<HTMLInputElement>inputElements[0]).value;
		var password = (<HTMLInputElement>inputElements[1]).value;
		this.Application.DataSource.authenticate(username, password).then((success) => {
			this.Application.loggedIn();
			this.working = false;
			this.hide();
		},(error) => {
				alert("There was an error authenticating: " + error);
				this.working = false;
			});
	}
} 