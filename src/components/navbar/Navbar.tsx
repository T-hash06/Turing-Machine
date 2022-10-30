import '../../styles/Navbar.css';

import { itemActive, setItemActive } from '../../stores/navbar';
import { useStore } from '@nanostores/react';

import NavbarItem from './NavbarItem';
import NavbarButton from './NavbarButton';

function FileMenu(): JSX.Element {
	const handleExit = (): void => {
		setItemActive('none');
	};

	return (
		<>
			<div className='navbar-menu'>
				<NavbarButton>open file</NavbarButton>
				<NavbarButton>save file</NavbarButton>
				<span className='separator'></span>
				<NavbarButton onClick={handleExit}>exit</NavbarButton>
			</div>
		</>
	);
}

function AboutMenu(): JSX.Element {
	const handleExit = (): void => {
		setItemActive('none');
	};

	return (
		<>
			<div className='navbar-menu'>
				<NavbarButton>about us</NavbarButton>
				<span className='separator'></span>
				<NavbarButton onClick={handleExit}>exit</NavbarButton>
			</div>
		</>
	);
}

export default function TopBar(): JSX.Element {
	const active = useStore(itemActive);

	const handleClick = (label: string): void => {
		setItemActive(label as NavbarOption);
	};

	const handleHover = (label: string): void => {
		if (active !== 'none') {
			setItemActive(label as NavbarOption);
		}
	};

	return (
		<>
			<div id='navbar-container'>
				<NavbarItem
					label='file'
					hidden={active !== 'file'}
					onClick={handleClick}
					onHover={handleHover}
				>
					<FileMenu />
				</NavbarItem>

				<NavbarItem
					label='about'
					hidden={active !== 'about'}
					onClick={handleClick}
					onHover={handleHover}
				>
					<AboutMenu />
				</NavbarItem>
			</div>
		</>
	);
}
