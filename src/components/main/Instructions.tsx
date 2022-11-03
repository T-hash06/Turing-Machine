import '../../styles/Instructions.css';

import {
	setFromPart,
	setToPart,
	switchDirection,
	userInstructions,
} from '../../stores/instructions';
import { MdOutlineArrowRightAlt as Arrow } from 'react-icons/md';
import { currentColor } from '../../stores/ribbon';
import { useStore } from '@nanostores/react';
import { ChangeEvent } from 'react';

import Button from '../ui/Button';
import classnames from 'classnames';

interface props extends Instruction {}

function Instruction(props: props): JSX.Element {
	const selectedColor = useStore(currentColor);

	const handleFromState = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;

		setFromPart(`${props.fromColor}:${props.fromState}`, `${props.fromColor}:${value}`);
	};

	const handleToState = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;

		setToPart(`${props.fromColor}:${props.fromState}`, `${props.toColor}:${value}:${props.moveTo}`);
	};

	const handleFromColor = (): void => {
		setFromPart(`${props.fromColor}:${props.fromState}`, `${selectedColor}:${props.fromState}`);
	};

	const handleToColor = (): void => {
		setToPart(
			`${props.fromColor}:${props.fromState}`,
			`${selectedColor}:${props.toState}:${props.moveTo}`
		);
	};

	const handleDirection = (): void => {
		switchDirection(`${props.fromColor}:${props.fromState}`);
	};

	return (
		<>
			<div className='instruction'>
				<input
					type='text'
					className='from-state input'
					value={props.fromState}
					onChange={handleFromState}
				></input>
				<span
					className='from-color color-cell'
					style={{ backgroundColor: props.fromColor }}
					onClick={handleFromColor}
				></span>
				<div className='to-icon'>
					<Arrow />
				</div>
				<span
					className='to-color color-cell'
					style={{ backgroundColor: props.toColor }}
					onClick={handleToColor}
				></span>
				<input
					type='text'
					className='to-state input'
					value={props.toState}
					onChange={handleToState}
				></input>
				<div
					className={classnames('direction', { left: props.moveTo === -1 })}
					onClick={handleDirection}
				>
					<Arrow />
				</div>
			</div>
		</>
	);
}

export default function Instructions(): JSX.Element {
	const instructions = useStore(userInstructions);

	return (
		<>
			<div id='instructions-container'>
				{/* <Instruction fromColor='#2a9d8f' toColor='#5b59d0' fromState='T' toState='A' moveTo={-1} />
				<Instruction fromColor='#2a9d8f' toColor='#5b59d0' fromState='T' toState='A' moveTo={1} /> */}
				{Array.from(instructions).map(([key, value], index) => {
					const [fromColor, fromState] = key.split(':') as [Color, string];
					const [toColor, toState, moveTo] = value.split(':') as [Color, string, Direction];

					return (
						<Instruction
							key={index}
							fromColor={fromColor}
							fromState={fromState}
							toColor={toColor}
							toState={toState}
							moveTo={Number(moveTo) as Direction}
						/>
					);
				})}

				<Button className='add-button'>add instruction</Button>
			</div>
		</>
	);
}
