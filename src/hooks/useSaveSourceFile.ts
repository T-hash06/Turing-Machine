import { userInstructions } from '../stores/instructions';
import { colorCells } from '../stores/ribbon';
import { testRibbons } from '../stores/tests';
import { useStore } from '@nanostores/react';
import { currentDoc } from '../stores/docs';
import { writeFile } from '@tauri-apps/api/fs';

export function useSaveSourceFile(): (path: string) => Promise<void> {
	const instructions = useStore(userInstructions);
	const cells = useStore(colorCells);
	const test = useStore(testRibbons);
	const docs = useStore(currentDoc);

	return async function (path: string): Promise<void> {
		const data: SourceFile = { instructions, cells, test, docs };

		try {
			await writeFile(path, JSON.stringify(data));
		} catch (error) {
			console.error(error);
			throw new Error('Error when saving file, read the traceback in the console');
		}
	};
}
