class RegisterDialog extends SmallDialog {
	private working: boolean = false;

	constructor(app: App) {
		super(app);
		this.title = "New?";
		// Generate regiter form
		var form = document.createElement("form");
		form.classList.add("logIn");
		form.innerHTML = '<input type="text" name="email" placeholder="email address" />'
		+ '<input type="password" name= "password" placeholder="password" />'
		+ '<input type="password" name= "confirmPassword" placeholder="confirm password" />';
		form.addEventListener("submit",() => {
			this.submit();
		});
		this.contentNodes = [form];
		// Add actions
		this.addAction({
			name: "Cancel", method: () => {
				if (this.working) {
					return;
				}
				new LogInDialog(this.Application).show();
				this.hide();
			}
		});
		this.addAction({
			name: "Register", method: () => {
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
		var email = (<HTMLInputElement>inputElements[0]).value;
		var password = (<HTMLInputElement>inputElements[1]).value;
		var confirmPassword = (<HTMLInputElement>inputElements[2]).value;
		this.Application.DataSource.register(email, password, confirmPassword).then((result) => {
			alert("Success!");
			this.working = false;
		}, (error) => {
			alert("An error occured while processing registration: " + error);
			this.working = false;
		});
	}
}