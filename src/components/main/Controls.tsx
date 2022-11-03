import '../../styles/Controls.css';

import {
	moveLeftPointer,
	moveRightPointer,
	setCurrentColor,
	setPointerIndex,
} from '../../stores/ribbon';

import Button from '../ui/Button';

function ColorSelector(): JSX.Element {
	const colors: Color[] = ['#e76f51', '#2a9d8f', '#e9c46a', '#a35cff', '#5b59d0', 'transparent'];

	const handleClick = (color: Color): void => {
		setCurrentColor(color);
	};

	return (
		<>
			<div id='color-selector'>
				<div className='selector'>
					{colors.map((color) => (
						<span
							key={color}
							className='color-button'
							style={{ backgroundColor: color }}
							onClick={(_) => handleClick(color)}
						></span>
					))}
				</div>
			</div>
		</>
	);
}

function PointerControls(): JSX.Element {
	const handleLeft = (): void => {
		moveLeftPointer();
	};
	const handleRight = (): void => {
		moveRightPointer();
	};

	const handleReset = (): void => {
		setPointerIndex(0);
	};

	return (
		<>
			<div id='pointer-controls'>
				<div className='buttons'>
					<Button className='pointer-button' onClick={handleLeft} main>
						Left
					</Button>
					<Button className='pointer-button' onClick={handleRight} main>
						Right
					</Button>
					<Button className='pointer-button reset-pointer' onClick={handleReset}>
						Reset Pointer
					</Button>
				</div>
			</div>
		</>
	);
}

export default function Controls(): JSX.Element {
	return (
		<>
			<section id='controls-container'>
				<ColorSelector />
				<PointerControls />
			</section>
		</>
	);
}
