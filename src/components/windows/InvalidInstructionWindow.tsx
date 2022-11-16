import '../../styles/windows/InvalidInstructionWindow.css';

import { colorCells, pointerIndex, pointerState } from '../../stores/ribbon';
import { MdOutlineArrowRightAlt as Arrow } from 'react-icons/md';
import { addInstruction } from '../../stores/instructions';
import { colors } from '../../constants/constants';
import { useStore } from '@nanostores/react';

import SubWindow from '../ui/SubWindow';
import Button from '../ui/Button';

interface props extends SubWindowProps {}
interface InstructionProps {
	fromState: string;
	fromColor: number;
}

function ExampleInstruction({ fromColor, fromState }: InstructionProps): JSX.Element {
	return (
		<div className='instruction-example'>
			<input className='input from-state' type='text' defaultValue={fromState} disabled />
			<span className='cell from-cell' style={{ backgroundColor: colors[fromColor] }}></span>
			<span className='arrow-icon'>
				<Arrow />
			</span>
			<span className='cell to-cell'></span>
			<input className='input to-state' disabled></input>
		</div>
	);
}

export default function InvalidInstructionWindow({ isShowing, onClose }: props): JSX.Element {
	if (!isShowing) return <></>;

	const fromState = useStore(pointerState);
	const cells = useStore(colorCells);
	const index = useStore(pointerIndex);
	const fromColor = cells[index];

	const handleClose = (): void => {
		onClose();
	};

	const handleCreate = (): void => {
		addInstruction({
			fromColor,
			fromState,

			toColor: colors.length - 1,
			toState: '',

			moveTo: 0,
		});
		onClose();
	};
	return (
		<>
			<SubWindow onClose={handleClose}>
				<div className='invalid-instruction'>
					<h1 className='title'>Undefined Instruction</h1>
					<div className='data-container'>
						<p className='text'>The following instruction is not defined correctly: </p>
						<ExampleInstruction fromColor={fromColor} fromState={fromState} />
						<p className='text'>Do you want to create it now? </p>
					</div>
					<Button className='close-button button' onClick={handleClose}>
						Close
					</Button>
					<Button className='create-button button' onClick={handleCreate} main>
						Create Now
					</Button>
				</div>
			</SubWindow>
		</>
	);
}
