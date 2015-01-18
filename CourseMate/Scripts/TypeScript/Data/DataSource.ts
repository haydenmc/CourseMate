class DataSource {
	public static APIURL: string = "/api";
	private _authInfo: AuthResponse;
	public get authInfo(): AuthResponse {
		return this._authInfo;
	}

	public authenticate(email: string, password: string): Promise<AuthResponse> {
		return new Promise<AuthResponse>((resolve: (result: AuthResponse) => void, reject: (error) => void) => {
			JsonRequest.httpPost<AuthResponse>('/Token', { Username: email, Password: password, grant_type: "password" }).then((success) => {
				this._authInfo = success;
				resolve(success);
			}, (error) => {
					reject(error);
				});
		});
	}

	public register(email: string, password: string, confirmPassword: string): Promise<string> {
		return new Promise<string>((resolve: (result: string) => void, reject: () => void) => {
			JsonRequest.httpPost<string>(DataSource.APIURL + '/Account/Register', {
				Email: email,
				Password: password,
				ConfirmPassword: confirmPassword
			}).then((success) => {
				resolve("Authenticated");
			},(error) => {
				reject();
			});
		});
	}
} 