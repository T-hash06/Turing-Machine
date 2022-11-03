import { atom } from 'nanostores';
import { colors } from '../constants/constants';

export const colorCells = atom<number[]>(new Array(32).fill(colors.length - 1));
export const currentColor = atom<number>(colors.length - 1);
export const pointerIndex = atom<number>(0);
export const pointerState = atom<string>('');

function parseindex(value: number): number {
	if (value >= 0) return value % 32;

	return 32 - (Math.abs(value) % 32);
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
