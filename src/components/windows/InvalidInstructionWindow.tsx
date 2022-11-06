import '../../styles/windows/InvalidInstructionWindow.css';

import { colorCells, pointerIndex, pointerState } from '../../stores/ribbon';
import { addInstruction } from '../../stores/instructions';
import { colors } from '../../constants/constants';
import { useStore } from '@nanostores/react';

import SubWindow from '../ui/SubWindow';
import Button from '../ui/Button';

interface props extends SubWindowProps {}

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
						<div className='instruction-example'></div>
						<p className='text'>Do you want to create this one now? </p>
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
