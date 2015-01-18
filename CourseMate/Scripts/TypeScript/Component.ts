class Component {
	private _app: App; // should be protected
	public get Application(): App {
		return this._app;
	}

	public componentId: string; // should be protected

	private _baseElement: HTMLElement; // should be protected
	public get baseElement(): HTMLElement {
		return this._baseElement;
	}

	public _parentElement: HTMLElement; // should be protected
	public get parentElement(): HTMLElement {
		return this._parentElement;
	}

	private _isHidden: boolean; // should be protected
	public get isHidden(): boolean {
		return this._isHidden;
	}

	public _title: string; // should be protected
	public get Title(): string {
		if (typeof this._title !== 'undefined') {
			return this._title;
		}
		return "component";
	}

	constructor(app?: App) {
		// We start hidden...
		this._isHidden = true;

		// Make sure we're associated with an application instance...
		if (app != null) {
			this._app = app;
		} else {
			this._app = App.instance; // Default instance if undefined
		}

		// Set default parent if none is set ...
		if (typeof this._parentElement === 'undefined') {
			this._parentElement = document.body;
		}

		// Get the component ID, grab the HTML
		this._baseElement = <HTMLDivElement> document.getElementById("component_" + this.componentId).cloneNode(true);
		this._baseElement.classList.remove("COMPONENT");
		this._baseElement.id = '';
	}

	public show(): void {
		if (!this.isHidden) {
			return;
		}
		this._isHidden = false;
		this._baseElement = <HTMLElement>this.parentElement.appendChild(this._baseElement);
		Animator.animate(this, "in");
	}

	public hide(): void {
		if (this.isHidden) {
			return;
		}
		this._isHidden = true;
		Animator.animate(this, "out").then(() => {
			this._baseElement = <HTMLElement>this.parentElement.removeChild(this._baseElement);
		});
	}
}