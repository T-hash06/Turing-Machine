import '../../styles/windows/TestWindow.css';

import { addRibbon, deleteTestRibbon, setCellsRibbon, testRibbons } from '../../stores/tests';
import { currentColor, loadFromTest, setCurrentColor } from '../../stores/ribbon';
import { colors } from '../../constants/constants';
import { useStore } from '@nanostores/react';
import { MdDelete } from 'react-icons/md';
import { MouseEvent } from 'react';

import SubWindow from '../ui/SubWindow';
import Button from '../ui/Button';

import classnames from 'classnames';

interface props extends SubWindowProps {}

interface RibbonProps {
	cells: number[];
	onClose: () => void;
	ribbonIndex: number;
}

function Ribbon({ ribbonIndex, cells, onClose }: RibbonProps): JSX.Element {
	const color = useStore(currentColor);

	const handleClick = (index: number): void => {
		const newCells = [...cells];
		newCells[index] = color;

		setCellsRibbon(ribbonIndex, newCells);
	};

	const handleHover = (event: MouseEvent, index: number): void => {
		if (event.buttons === 0) return;
		if (event.buttons === 1) handleClick(index);
	};

	const handleSet = (): void => {
		loadFromTest(cells);
		onClose();
	};

	const handleDelete = (): void => {
		deleteTestRibbon(ribbonIndex);
	};
	return (
		<>
			<div className='ribbon'>
				<div className='cells-container'>
					{cells.map((cell, index) => (
						<span
							className='cell'
							key={index}
							style={{ backgroundColor: colors[cell] }}
							onMouseDown={(_) => handleClick(index)}
							onMouseEnter={(event) => handleHover(event, index)}
						></span>
					))}
				</div>
				<Button className='button apply' onClick={handleSet}>
					Set
				</Button>
				<Button className='button delete' onClick={handleDelete}>
					<MdDelete />
				</Button>
			</div>
		</>
	);
}

function ColorSelector(): JSX.Element {
	const current = useStore(currentColor);

	const handleClick = (index: number): void => {
		setCurrentColor(index);
	};

	return (
		<>
			<div className='color-selector'>
				{colors.map((color, index) => {
					const selected = current === index;
					const boxShadow = `0px 0px 10px ${selected ? color : 'transparent'}`;

					return (
						<span
							className={classnames('cell', { selected })}
							style={{ backgroundColor: color, boxShadow }}
							key={color}
							onClick={() => handleClick(index)}
						></span>
					);
				})}
			</div>
		</>
	);
}

export default function TestWindow({ isShowing, onClose }: props): JSX.Element {
	if (!isShowing) return <></>;

	const ribbons = useStore(testRibbons);

	return (
		<>
			<SubWindow onClose={onClose}>
				<div className='test-window'>
					<div className='ribbons-section'>
						{ribbons.map((ribbon, index) => (
							<Ribbon onClose={onClose} ribbonIndex={index} key={index} cells={ribbon} />
						))}
					</div>
					<div className='bottom-section'>
						<Button className='button close-button' onClick={onClose}>
							Close
						</Button>
						<ColorSelector />
						<Button className='button add-button' onClick={() => addRibbon()}>
							Add Test
						</Button>
						<Button className='button' onClick={onClose} main>
							Save
						</Button>
					</div>
				</div>
			</SubWindow>
		</>
	);
}
