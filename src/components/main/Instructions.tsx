import '../../styles/Instructions.css';

import {
	addInstruction,
	deleteInstruction,
	parseInstruction,
	setFromPart,
	setToPart,
	switchDirection,
	userInstructions,
} from '../../stores/instructions';
import { MdDelete, MdOutlineArrowRightAlt as Arrow } from 'react-icons/md';
import { GiPauseButton as Stop } from 'react-icons/gi';
import { colors } from '../../constants/constants';
import { currentColor } from '../../stores/ribbon';
import { useStore } from '@nanostores/react';
import { ChangeEvent } from 'react';

import Button from '../ui/Button';

import classnames from 'classnames';

interface props extends Instruction {}
interface iconProps {
	direction: Direction;
	onClick: () => void;
}

function StepIcon({ direction, onClick }: iconProps): JSX.Element {
	if (direction === 1 || direction === -1)
		return (
			<div
				className={classnames('direction', {
					left: direction === -1,
				})}
				onClick={onClick}
			>
				<Arrow />
			</div>
		);

	return (
		<div className={classnames('direction stop')} onClick={onClick}>
			<Stop />
		</div>
	);
}

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

	const handleDelete = (): void => {
		deleteInstruction(`${props.fromColor}:${props.fromState}`);
	};
	return (
		<>
			<div className='instruction'>
				<button className='delete-button' onClick={handleDelete}>
					<MdDelete></MdDelete>
				</button>
				<input
					type='text'
					className='from-state input'
					value={props.fromState}
					onChange={handleFromState}
				></input>
				<span
					className='from-color color-cell'
					style={{ backgroundColor: colors[props.fromColor] }}
					onClick={handleFromColor}
				></span>
				<div className='to-icon'>
					<Arrow />
				</div>
				<span
					className='to-color color-cell'
					style={{ backgroundColor: colors[props.toColor] }}
					onClick={handleToColor}
				></span>
				<input
					type='text'
					className='to-state input'
					value={props.toState}
					onChange={handleToState}
				></input>
				<StepIcon direction={props.moveTo} onClick={handleDirection} />
			</div>
		</>
	);
}

function InstructionList(): JSX.Element {
	const instructions = useStore(userInstructions);

	return (
		<>
			{instructions.map(([key, value], index) => {
				const [fromColor, fromState] = parseInstruction<[number, string]>(key);
				const [toColor, toState, moveTo] = parseInstruction<[number, string, Direction]>(value);

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
		</>
	);
}

export default function Instructions(): JSX.Element {
	const handleAdd = (): void => {
		addInstruction({
			fromColor: colors.length - 1,
			toColor: colors.length - 1,

			fromState: '',
			toState: '',

			moveTo: 0,
		});
	};

	return (
		<>
			<div id='instructions-container'>
				<InstructionList />
				<Button className='add-button' onClick={handleAdd}>
					add instruction
				</Button>
			</div>
		</>
	);
}
