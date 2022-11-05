import '../../styles/ui/NamedSection.css';

import classnames from 'classnames';

interface props {
	children: JSX.Element;
	name: string;
	className?: string;
}

export default function NamedSection({ children, className, name }: props): JSX.Element {
	return (
		<>
			<div className={classnames('named-section', { [className ?? '']: className })}>
				{children}
				<label className='label'>{name}</label>
			</div>
		</>
	);
}
