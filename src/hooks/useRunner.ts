import { useStore } from '@nanostores/react';
import { getInstruction } from '../stores/instructions';
import {
	colorCells,
	movePointer,
	pointerIndex,
	pointerState,
	setColorCell,
	setPointerState,
} from '../stores/ribbon';

export function useRunStep(): () => void {
	const pointer = useStore(pointerIndex);
	const state = useStore(pointerState);
	const cells = useStore(colorCells);

	return function (): boolean {
		const color = cells[pointer];

		const instruction = getInstruction(color, state);

		if (instruction === undefined) return false;

		movePointer(instruction.moveTo);
		setPointerState(instruction.toState);
		setColorCell(pointer, instruction.toColor);

		return true;
	};
}
