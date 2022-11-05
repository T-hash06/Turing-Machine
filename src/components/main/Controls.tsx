import '../../styles/main/Controls.css';

import {
	moveLeftPointer,
	moveRightPointer,
	setCurrentColor,
	setPointerIndex,
	setPointerState,
} from '../../stores/ribbon';
import { clearInstructions } from '../../stores/instructions';
import { colors } from '../../constants/constants';

import Button from '../ui/Button';

function ColorSelector(): JSX.Element {
	const handleClick = (index: number): void => {
		setCurrentColor(index);
	};

	return (
		<>
			<div id='color-selector'>
				<div className='selector'>
					{colors.map((color, index) => (
						<span
							key={color}
							className='color-button'
							style={{ backgroundColor: color }}
							onClick={(_) => handleClick(index)}
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
		setPointerState('');
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
	const handleDelete = (): void => {
		clearInstructions();
	};

	return (
		<>
			<section id='controls-container'>
				<ColorSelector />
				<PointerControls />
				<Button className='delete-instructions' onClick={handleDelete}>
					delete instructions
				</Button>
			</section>
		</>
	);
}
