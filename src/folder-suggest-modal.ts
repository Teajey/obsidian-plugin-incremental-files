import { App, FuzzySuggestModal, TFolder } from "obsidian";

export class FolderSuggestModal extends FuzzySuggestModal<TFolder> {
	constructor(
		app: App,
		private onChoose: (folder: TFolder) => void,
	) {
		super(app);
	}

	getItems(): TFolder[] {
		return this.app.vault
			.getRoot()
			.children.filter((f): f is TFolder => f instanceof TFolder);
	}

	getItemText(folder: TFolder): string {
		return `${folder.name}/`;
	}

	onChooseItem(folder: TFolder): void {
		this.onChoose(folder);
	}
}
