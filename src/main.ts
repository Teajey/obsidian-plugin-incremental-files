import { App, Plugin, Notice } from "obsidian";

import { FolderSuggestModal } from "./folder-suggest-modal";
import { lastIncrementalFile, nextIncrementalName } from "./increment";

function openLast(app: App) {
	new FolderSuggestModal(app, async (folder) => {
		const file = lastIncrementalFile(folder);
		if (!file) {
			new Notice(`No incremental files in ${folder.name}`);
			return;
		}
		await app.workspace.getLeaf().openFile(file);
	}).open();
}

function openNext(app: App) {
	new FolderSuggestModal(app, async (folder) => {
		const name = nextIncrementalName(folder);
		const path = `${folder.path}/${name}`;
		const file = await app.vault.create(path, "");
		await app.workspace.getLeaf().openFile(file);
	}).open();
}

export default class IncrementalFilenamesPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "open-last-incremental-file-in-folder",
			name: "Open last incremental file in folder",
			callback: () => {
				openLast(this.app);
			},
		});

		this.addCommand({
			id: "create-new-incremental-file",
			name: "Create new incremental file in folder",
			callback: () => {
				openNext(this.app);
			},
		});

		this.addRibbonIcon(
			"list-end",
			"Open last incremental file in folder",
			() => {
				openLast(this.app);
			},
		);

		this.addRibbonIcon(
			"list-plus",
			"Create new incremental file in folder",
			() => {
				openNext(this.app);
			},
		);
	}

	onunload() {}
}
