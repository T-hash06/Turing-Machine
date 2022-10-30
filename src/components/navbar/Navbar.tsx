import '../../styles/Navbar.css';

import { itemActive, setItemActive } from '../../stores/navbar';
import { useStore } from '@nanostores/react';
import { open, save } from '@tauri-apps/api/dialog';

import NavbarItem from './NavbarItem';
import NavbarButton from './NavbarButton';

function FileMenu(): JSX.Element {
	const handleExit = (): void => {
		setItemActive('none');
	};

	const handleOpen = (): void => {
		void openFile();
	};

	const handleSave = (): void => {
		void selectSaveFile();
	};
	const openFile = async (): Promise<void> => {
		const selected = await open({
			multiple: false,
			filters: [{ name: 'Source', extensions: ['tsf'] }],
		});

		console.log(selected);
	};

	const selectSaveFile = async (): Promise<void> => {
		const selected = await save({
			filters: [{ name: 'Source', extensions: ['tsf'] }],
		});

		console.log(selected + '.tsf');
	};

	return (
		<>
			<div className='navbar-menu'>
				<NavbarButton onClick={handleOpen}>open file</NavbarButton>
				<NavbarButton onClick={handleSave}>save file</NavbarButton>
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
