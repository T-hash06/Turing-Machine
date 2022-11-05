import '../../styles/navbar/NavbarItem.css';

import classnames from 'classnames';

interface props {
	children: JSX.Element;
	label: string;
	hidden: boolean;
	onClick: (label: string) => void;
	onHover?: (label: string) => void;
}

export default function NavbarItem({
	children,
	label,
	hidden,
	onClick,
	onHover,
}: props): JSX.Element {
	const handleClick = (): void => {
		onClick(label);
	};

	const handleHover = (): void => {
		if (onHover !== undefined) onHover(label);
	};

	return (
		<>
			<div className='navbar-item' onClick={handleClick} onMouseEnter={handleHover}>
				<label className='label'>{label}</label>
				<div
					className={classnames('menu-container', {
						hidden,
					})}
				>
					{children}
				</div>
			</div>
		</>
	);
}
