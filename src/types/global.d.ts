export {};

declare global {
	type Color = '#e76f51' | '#2a9d8f' | '#e9c46a' | '#a35cff' | '#5b59d0' | 'transparent';
	type NavbarOption = 'none' | 'file' | 'about';
	type Direction = -1 | 0 | 1;
	type FromInstruction = `${number}:${string}`;
	type ToInstruction = `${number}:${string}:${Direction}`;

	interface Cell {
		color: Color;
	}

	interface Instruction {
		fromColor: number;
		toColor: number;

		fromState: string;
		toState: string;

		moveTo: Direction;
	}
}
