import { atom } from 'nanostores';

export const colorCells = atom<Color[]>(new Array(32).fill('transparent'));
export const currentColor = atom<Color>('#e76f51');
export const pointerIndex = atom<number>(0);

function parseindex(value: number): number {
	if (value >= 0) return value % 32;

	return 32 - (Math.abs(value) % 32);
}

export function setColorCell(index: number, color: Color): void {
	const newCells = colorCells.get();
	newCells[index] = color;

	colorCells.set([...newCells]);
}

export function setCurrentColor(color: Color): void {
	currentColor.set(color);
}

export function setPointerIndex(index: number): void {
	pointerIndex.set(parseindex(index));
}

export function moveLeftPointer(): void {
	pointerIndex.set(parseindex(pointerIndex.get() - 1));
}

export function moveRightPointer(): void {
	pointerIndex.set(parseindex(pointerIndex.get() + 1));
}
