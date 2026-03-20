import { TFolder, TFile } from "obsidian";

const PADDING = 5;
const PATTERN = /^(\d+)\.md$/;

function incrementalFiles(folder: TFolder): { file: TFile; n: number }[] {
	return folder.children
		.filter((f): f is TFile => f instanceof TFile)
		.flatMap((file) => {
			const match = PATTERN.exec(file.name);
			if (!match?.[1]) return [];
			return [{ file, n: parseInt(match[1], 10) }];
		})
		.sort((a, b) => a.n - b.n);
}

export function lastIncrementalFile(folder: TFolder): TFile | null {
	const files = incrementalFiles(folder);
	return files.at(-1)?.file ?? null;
}

export function nextIncrementalName(folder: TFolder): string {
	const files = incrementalFiles(folder);
	const next = (files.at(-1)?.n ?? 0) + 1;
	return `${String(next).padStart(PADDING, "0")}.md`;
}
