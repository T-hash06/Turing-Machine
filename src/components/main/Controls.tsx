import '../../styles/Controls.css';

import { setCurrentColor } from '../../stores/ribbon';

function ColorSelector(): JSX.Element {
	const colors: Color[] = ['#e76f51', '#2a9d8f', '#e9c46a', '#a35cff', '#5b59d0', 'transparent'];

	const handleClick = (color: Color): void => {
		setCurrentColor(color);
	};

	return (
		<>
			<div id='color-selector'>
				<div className='selector'>
					{colors.map((color) => (
						<span
							key={color}
							className='color-button'
							style={{ backgroundColor: color }}
							onClick={(_) => handleClick(color)}
						></span>
					))}
				</div>
			</div>
		</>
	);
}

export default function Controls(): JSX.Element {
	return (
		<>
			<section id='controls-container'>
				<ColorSelector />
			</section>
		</>
	);
}
