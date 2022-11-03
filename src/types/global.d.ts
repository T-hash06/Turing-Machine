export {};

declare global {
	type NavbarOption = 'none' | 'file' | 'about';
	type Color = '#e76f51' | '#2a9d8f' | '#e9c46a' | '#a35cff' | '#5b59d0' | 'transparent';
	type Direction = -1 | 0 | 1;
	type FromInstruction = `${Color}:${string}`;
	type ToInstruction = `${Color}:${string}:${Direction}`;

	interface Cell {
		color: Color;
	}

	interface Instruction {
		fromColor: Color;
		toColor: Color;

		fromState: string;
		toState: string;

		moveTo: Direction;
	}
}
