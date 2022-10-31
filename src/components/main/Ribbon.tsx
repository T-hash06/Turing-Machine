import '../../styles/Ribbon.css';

import { colorCells, currentColor, setColorCell } from '../../stores/ribbon';
import { setItemActive } from '../../stores/navbar';
import { useStore } from '@nanostores/react';

export default function Ribbon(): JSX.Element {
	const cells = useStore(colorCells);
	const color = useStore(currentColor);

	const mainClick = (): void => {
		setItemActive('none');
	};

	const handleCellClick = (index: number): void => {
		setColorCell(index, color);
	};

	return (
		<>
			<section id='ribbon-section' onClick={mainClick}>
				<section id='cells-container'>
					{cells.map((color, index) => (
						<span
							className='cell'
							style={{ backgroundColor: color }}
							key={index}
							onClick={(_) => handleCellClick(index)}
						></span>
					))}
				</section>
			</section>
		</>
	);
}
