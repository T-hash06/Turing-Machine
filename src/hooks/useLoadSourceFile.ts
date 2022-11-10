import { readTextFile } from '@tauri-apps/api/fs';
import { setCurrentDoc } from '../stores/docs';
import { setInstruction } from '../stores/instructions';
import { setCells } from '../stores/ribbon';
import { setRibbons } from '../stores/tests';

export default function useLoadSourceFile(): (file: string) => Promise<void> {
	return async function (file: string): Promise<void> {
		try {
			const readedFile = JSON.parse(await readTextFile(file)) as SourceFile;

			if (readedFile === undefined) return;

			setInstruction(readedFile.instructions);
			setCells(readedFile.cells);
			setRibbons(readedFile.test);
			setCurrentDoc(readedFile.docs);
		} catch (error) {
			console.error(error);
			throw new Error('Error when reading file, read the traceback in the console');
		}
	};
}
