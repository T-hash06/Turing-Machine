import '../../styles/Ribbon.css';

import { colorCells, currentColor, pointerIndex, setColorCell } from '../../stores/ribbon';
import { MouseEvent, useEffect, useRef } from 'react';
import { setItemActive } from '../../stores/navbar';
import { colors } from '../../constants/constants';
import { useStore } from '@nanostores/react';

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

	const mainClick = (): void => {
		setItemActive('none');
	};

	const handleCellClick = (index: number): void => {
		setColorCell(index, color);
	};

	const handleHover = (event: MouseEvent, index: number): void => {
		if (event.buttons === 0) return;
		if (event.buttons === 1) setColorCell(index, color);
	};

	return (
		<>
			<section id='ribbon-section' onClick={mainClick}>
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
			</section>
		</>
	);
}
