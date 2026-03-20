import { App, Plugin, Notice } from "obsidian";

import {
	DEFAULT_SETTINGS,
	type IncrementalFilenamesPluginSettings as Settings,
} from "./settings";
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
	settings!: Settings;

	async onload() {
		await this.loadSettings();

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

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<Settings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
