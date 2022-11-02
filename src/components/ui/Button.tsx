import '../../styles/Button.css';

import classnames from 'classnames';

interface props {
	children: string;
	onClick?: () => void;
	className?: string;
}

export default function Button({ children, className, onClick }: props): JSX.Element {
	const handleClick = (): void => {
		if (onClick !== undefined) onClick();
	};

	return (
		<>
			<button
				className={classnames('button-container', { [className ?? '']: className })}
				onClick={handleClick}
			>
				{children}
			</button>
		</>
	);
}
