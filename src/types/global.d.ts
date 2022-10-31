export {};

declare global {
	type NavbarOption = 'none' | 'file' | 'about';
	type Color = '#e76f51' | '#2a9d8f' | '#e9c46a' | '#a35cff' | '#5b59d0' | 'transparent';
	type direction = 'left' | 'right';

	interface Cell {
		color: Color;
	}

	interface Intruction {
		fromColor: Color;
		toColor: Color;

		fromState: string;
		toString: string;

		moveTo: direction;
	}
}
