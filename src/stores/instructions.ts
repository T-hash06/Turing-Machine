import { atom } from 'nanostores';

export const userInstructions = atom<Array<[FromInstruction, ToInstruction]>>([]);

export function setInstruction(instructions: Array<[FromInstruction, ToInstruction]>): void {
	const newInstructions = [...instructions];
	userInstructions.set(newInstructions);
}

export function clearInstructions(): void {
	userInstructions.set([]);
}

export function addInstruction(instruction: Instruction): void {
	const newValues = [...userInstructions.get()];

	newValues.push([
		`${instruction.fromColor}:${instruction.fromState}`,
		`${instruction.toColor}:${instruction.toState}:${instruction.moveTo}`,
	]);

	userInstructions.set(newValues);
}

export function deleteInstruction(from: FromInstruction): void {
	const newValues = [...userInstructions.get()];
	const froms = newValues.map((item) => item[0]);

	const to = froms.lastIndexOf(from);

	if (to === -1) return;

	newValues.splice(to, 1);

	userInstructions.set(newValues);
}

export function setFromPart(from: FromInstruction, newFrom: FromInstruction): void {
	const newValues = [...userInstructions.get()];
	const froms = newValues.map((item) => item[0]);

	const to = froms.lastIndexOf(from);

	if (to === -1) return;

	newValues[to][0] = newFrom;

	userInstructions.set(newValues);
}

export function setToPart(from: FromInstruction, newTo: ToInstruction): void {
	const newValues = [...userInstructions.get()];
	const froms = newValues.map((item) => item[0]);

	const index = froms.lastIndexOf(from);

	if (index === -1) return;

	newValues[index][1] = newTo;

	userInstructions.set(newValues);
}

export function switchDirection(from: FromInstruction): void {
	const newValues = [...userInstructions.get()];
	const froms = newValues.map((item) => item[0]);

	const index = froms.lastIndexOf(from);

	if (index === -1) return;

	const toPart = newValues[index][1];

	if (toPart === undefined) return;

	const [toColor, toState, moveTo] = parseInstruction<[number, string, Direction]>(toPart);
	const parsedMoveTo = Number(moveTo) === 0 ? 1 : Number(moveTo) === 1 ? -1 : 0;

	newValues[index][1] = `${toColor}:${toState}:${parsedMoveTo}`;

	userInstructions.set(newValues);
}

export function getInstruction(color: number, state: string): Instruction | undefined {
	const values = [...userInstructions.get()];
	const froms = values.map((item) => item[0]);

	const index = froms.lastIndexOf(`${color}:${state}`);

	if (index === -1) return undefined;

	const [toColor, toState, moveTo] = parseInstruction<[number, string, Direction]>(
		values[index][1]
	);

	return { fromColor: color, fromState: state, toColor, toState, moveTo };
}

export function parseInstruction<T>(data: FromInstruction | ToInstruction): T {
	return data.split(':').map((value) => (isNaN(parseInt(value)) ? value : parseInt(value))) as T;
}
