import '../../styles/ui/Button.css';

import { ReactElement } from 'react';

import classnames from 'classnames';

interface props {
	children: string | ReactElement;
	onClick?: () => void;
	className?: string;
	main?: boolean;
}

export default function Button({ children, className, main, onClick }: props): JSX.Element {
	const handleClick = (): void => {
		if (onClick !== undefined) onClick();
	};

	return (
		<>
			<button
				className={classnames('button-container', { [className ?? '']: className, main })}
				onClick={handleClick}
			>
				{children}
			</button>
		</>
	);
}
