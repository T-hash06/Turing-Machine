import { atom } from 'nanostores';

export const userInstructions = atom(new Map<FromInstruction, ToInstruction>());

export function addInstruction(instruction: Instruction): void {
	const newValues = new Map(userInstructions.get());

	newValues.set(
		`${instruction.fromColor}:${instruction.fromState}`,
		`${instruction.toColor}:${instruction.toState}:${instruction.moveTo}`
	);

	userInstructions.set(newValues);
}

export function setFromPart(from: FromInstruction, newFrom: FromInstruction): void {
	const newValues = new Map(userInstructions.get());

	const to = userInstructions.get().get(from);

	if (to === undefined) return;

	newValues.delete(from);
	newValues.set(newFrom, to);

	userInstructions.set(newValues);
}

export function setToPart(from: FromInstruction, newTo: ToInstruction): void {
	const newValues = new Map(userInstructions.get());
	newValues.set(from, newTo);

	userInstructions.set(newValues);
}

export function switchDirection(from: FromInstruction): void {
	const newValues = new Map(userInstructions.get());
	const toPart = newValues.get(from);

	if (toPart === undefined) return;

	const [toColor, toState, moveTo] = toPart.split(':') as [Color, string, Direction];

	newValues.set(from, `${toColor}:${toState}:${moveTo < 0 ? 1 : -1}`);

	userInstructions.set(newValues);
}

addInstruction({
	fromColor: '#2a9d8f',
	toColor: '#5b59d0',
	fromState: 'test',
	toState: 'asd',
	moveTo: 0,
});
