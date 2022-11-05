import '../../styles/ui/SubWindow.css';

import { MouseEvent } from 'react';

interface props {
	children: JSX.Element;
	onClose: (event: MouseEvent) => void;
}

export default function SubWindow({ children, onClose }: props): JSX.Element {
	const handleExit = (event: MouseEvent): void => {
		if (onClose !== undefined) onClose(event);
	};

	return (
		<>
			<div className='subwindow-container'>
				<div className='shadow-container' onClick={handleExit}></div>
				{children}
			</div>
		</>
	);
}
