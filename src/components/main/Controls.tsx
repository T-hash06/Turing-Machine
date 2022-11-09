import '../../styles/main/Controls.css';

import {
	currentColor,
	moveLeftPointer,
	moveRightPointer,
	setCurrentColor,
	setPointerIndex,
	setPointerState,
} from '../../stores/ribbon';
import { clearInstructions } from '../../stores/instructions';
import { colors } from '../../constants/constants';
import { useStore } from '@nanostores/react';

import Button from '../ui/Button';

import classnames from 'classnames';

function ColorSelector(): JSX.Element {
	const current = useStore(currentColor);

	const handleClick = (index: number): void => {
		setCurrentColor(index);
	};

	return (
		<>
			<div id='color-selector'>
				<div className='selector'>
					{colors.map((color, index) => {
						const selected = current === index;
						const boxShadow = `0px 0px 10px ${selected ? color : 'transparent'}`;

						return (
							<span
								key={color}
								className={classnames('color-button', { selected })}
								style={{ backgroundColor: color, boxShadow }}
								onClick={(_) => handleClick(index)}
							></span>
						);
					})}
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
