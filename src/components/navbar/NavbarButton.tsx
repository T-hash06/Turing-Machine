import { MouseEvent } from 'react';
import '../../styles/NavbarButton.css';

interface props {
	children: string;
	onClick?: () => void;
}

export default function NavbarButton({ children, onClick }: props): JSX.Element {
	const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
		event.stopPropagation();
		if (onClick !== undefined) onClick();
	};

	return (
		<>
			<button className='navbar-button' onClick={handleClick}>
				{children}
			</button>
		</>
	);
}
