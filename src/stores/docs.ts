import { atom } from 'nanostores';

export const currentDoc = atom<DocInterface>({
	name: '',
	autor: '',
	preCondition: '',
	postCondition: '',
	strategy: '',
	comment: '',
});

export function setCurrentDoc(newDoc: DocInterface): void {
	currentDoc.set(newDoc);
}
