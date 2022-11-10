import { atom } from 'nanostores';
import { colors, ribbonTestCells } from '../constants/constants';

export const colorCells = atom<number[]>(new Array(32).fill(colors.length - 1));
export const currentColor = atom<number>(colors.length - 1);
export const pointerIndex = atom<number>(0);
export const pointerState = atom<string>('');

function parseindex(value: number): number {
	if (value >= 0) return value % 32;

	return 32 - (Math.abs(value) % 32);
}

export function setCells(cells: number[]): void {
	const newCells = [...cells];
	colorCells.set(newCells);
}

export function loadFromTest(cells: number[]): void {
	const newCells = [...cells, ...new Array(32 - ribbonTestCells).fill(colors.length - 1)];

	colorCells.set(newCells);
}

export function clearCells(): void {
	const newCells = new Array(32).fill(colors.length - 1);

	colorCells.set(newCells);
}

export function setColorCell(index: number, color: number): void {
	const newCells = colorCells.get();
	newCells[index] = color;

	colorCells.set([...newCells]);
}

export function setCurrentColor(index: number): void {
	currentColor.set(index);
}

export function setPointerIndex(index: number): void {
	pointerIndex.set(parseindex(index));
}

export function setPointerState(state: string): void {
	pointerState.set(state);
}

export function moveLeftPointer(): void {
	pointerIndex.set(parseindex(pointerIndex.get() - 1));
}

export function moveRightPointer(): void {
	pointerIndex.set(parseindex(pointerIndex.get() + 1));
}

export function movePointer(direction: Direction): void {
	if (direction === -1) return moveLeftPointer();
	if (direction === 1) return moveRightPointer();
}
