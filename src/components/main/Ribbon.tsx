import '../../styles/main/Ribbon.css';

import {
	clearCells,
	colorCells,
	currentColor,
	pointerIndex,
	pointerState,
	setColorCell,
} from '../../stores/ribbon';
import { MouseEvent, useEffect, useRef } from 'react';
import { colors } from '../../constants/constants';
import { useStore } from '@nanostores/react';

import NamedSection from '../ui/NamedSection';
import Button from '../ui/Button';

function Pointer(): JSX.Element {
	const pointer = useRef<HTMLSpanElement>(null);

	const index = useStore(pointerIndex);

	useEffect(() => {
		if (pointer.current === null) return;

		pointer.current.style.setProperty('--index', index.toString());
	}, [pointer, index]);

	return (
		<>
			<span id='pointer' ref={pointer}></span>
		</>
	);
}

export default function Ribbon(): JSX.Element {
	const cells = useStore(colorCells);
	const color = useStore(currentColor);
	const state = useStore(pointerState);

	const handleCellClick = (index: number): void => {
		setColorCell(index, color);
	};

	const handleHover = (event: MouseEvent, index: number): void => {
		if (event.buttons === 0) return;
		if (event.buttons === 1) setColorCell(index, color);
	};

	const handleClear = (): void => {
		clearCells();
	};

	return (
		<>
			<section id='ribbon-section'>
				<section id='cells-container'>
					{cells.map((color, index) => (
						<span
							className='cell'
							style={{ backgroundColor: colors[color] }}
							key={index}
							onMouseDown={(_) => handleCellClick(index)}
							onMouseEnter={(event) => handleHover(event, index)}
						></span>
					))}
					<Pointer />
				</section>
				<section className='ribbon-controls'>
					<NamedSection name='current state' className='pointer-state'>
						<span className='state'>{state}</span>
					</NamedSection>
					<Button className='clear-ribbon' onClick={handleClear}>
						Clear Ribbon
					</Button>
				</section>
			</section>
		</>
	);
}
