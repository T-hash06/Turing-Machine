import { atom } from 'nanostores';
import { colors, ribbonTestCells } from '../constants/constants';

export const initialState = atom('');

export const testRibbons = atom<number[][]>([]);

export function addRibbon(): void {
	const newRibbons = [...testRibbons.get(), new Array(ribbonTestCells).fill(colors.length - 1)];

	testRibbons.set(newRibbons);
}

export function setCellsRibbon(index: number, cells: number[]): void {
	const newRibbons = [...testRibbons.get()];

	newRibbons[index] = cells;
	testRibbons.set(newRibbons);
}

export function deleteTestRibbon(index: number): void {
	console.log(testRibbons.get());

	const newRibbons = [...testRibbons.get()].filter((_, currentIndex) => index !== currentIndex);
	console.log(newRibbons);

	testRibbons.set(newRibbons);
}
