import { App, Plugin, Notice, TFolder, TFile } from "obsidian";

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

async function getTemplateContent(app: App, folderPath: string): Promise<string> {
		const templates = app.vault.getAbstractFileByPath("templates");
		if (!(templates instanceof TFolder) || folderPath.contains("/")) {
			return "";
		}
		const template = templates.children.find((x) => x.name.substring(x.name.lastIndexOf('.')));
		if (!(template instanceof TFile)) {
			return "";
		}
		let content = await app.vault.read(template);
	  content = content
	    .replace(/{{date(?::(.+?))?}}/g, (_, fmt) => window.moment().format(fmt ?? "YYYY-MM-DD"))
	    .replace(/{{time(?::(.+?))?}}/g, (_, fmt) => window.moment().format(fmt ?? "HH:mm"));
	  return content;
}

function openNext(app: App) {
	new FolderSuggestModal(app, async (folder) => {
		const name = nextIncrementalName(folder);
		const path = `${folder.path}/${name}`;
		const content = await getTemplateContent(app, folder.path)
		const file = await app.vault.create(path, content);
		await app.workspace.getLeaf().openFile(file);
	}).open();
}

export default class IncrementalFilesPlugin extends Plugin {
	onload() {
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
