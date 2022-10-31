import { atom } from 'nanostores';

export const colorCells = atom<Color[]>(new Array(32).fill('transparent'));

export const currentColor = atom<Color>('#e76f51');

export function setColorCell(index: number, color: Color): void {
	const newCells = colorCells.get();
	newCells[index] = color;

	colorCells.set([...newCells]);
}

export function setCurrentColor(color: Color): void {
	currentColor.set(color);
}
