class SmallDialog extends Component {
	// Title
	public set title(str: string) {
		(<HTMLElement>this.baseElement.querySelector("div.container header")).innerHTML = str;
	}
	public get title(): string {
		return (<HTMLElement>this.baseElement.querySelector("div.container header")).innerHTML;
	}

	// Content
	public set contentNodes(nodes: Array<Node>) {
		var contentNode = (<HTMLElement>this.baseElement.querySelector("div.container div.content"));
		contentNode.innerHTML = '';
		for (var i in nodes) {
			contentNode.appendChild(nodes[i]);
		}
	}
	public get contentNodes(): Array<Node> {
		return [].slice.call(this.baseElement.querySelector("div.container div.content").childNodes);
	}
	public set contentHtml(html: string) {
		(<HTMLElement>this.baseElement.querySelector("div.container div.content")).innerHTML = html;
	}

	public get contentHtml(): string {
		return (<HTMLElement>this.baseElement.querySelector("div.container div.content")).innerHTML;
	}

	constructor(app: App) {
		this.componentId = "SmallDialog";
		super(app);
	}

	public addAction(action: { name: string; method: () => void }) {
		var actionButton = document.createElement("a");
		actionButton.innerHTML = action.name;
		actionButton.addEventListener("click", action.method);
		var actionListItem = document.createElement("li");
		actionListItem.appendChild(actionButton);
		var actionsListElement = <HTMLElement>(this.baseElement.querySelector("footer ul.actions"));
		actionsListElement.appendChild(actionListItem);

		var listItems = actionsListElement.querySelectorAll("li");
		for (var i = 0; i < listItems.length; i++) {
			(<HTMLElement>listItems[i]).style.width = ((1 / listItems.length) * 100) + "%";
		}
	}
} 