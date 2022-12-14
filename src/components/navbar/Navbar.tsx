import '../../styles/navbar/Navbar.css';

import { useSaveSourceFile } from '../../hooks/useSaveSourceFile';
import { itemActive, setItemActive } from '../../stores/navbar';
import { open, save } from '@tauri-apps/api/dialog';
import { useStore } from '@nanostores/react';
import { useState } from 'react';

import AboutUsWindow from '../windows/AboutUsWindow';
import NavbarButton from './NavbarButton';
import NavbarItem from './NavbarItem';
import useLoadSourceFile from '../../hooks/useLoadSourceFile';

function FileMenu(): JSX.Element {
	const saveSourceFile = useSaveSourceFile();
	const loadSourceFile = useLoadSourceFile();

	const handleExit = (): void => {
		setItemActive('none');
	};

	const handleOpen = (): void => {
		void openFile();
		handleExit();
	};

	const handleSave = (): void => {
		void selectSaveFile();
		handleExit();
	};
	const openFile = async (): Promise<void> => {
		const selected = (await open({
			multiple: false,
			filters: [{ name: 'Source', extensions: ['tsf'] }],
		})) as string;

		if (selected === null) return;

		void loadSourceFile(selected);
	};

	const selectSaveFile = async (): Promise<void> => {
		const selected = await save({
			filters: [{ name: 'Source', extensions: ['.tsf'] }],
		});

		if (selected === null) return;

		const path = `${selected.split('.')[0]}.tsf`;

		await saveSourceFile(path);
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
	const [aboutVisible, setAboutVisible] = useState(false);

	const handleExit = (): void => {
		setItemActive('none');
	};
	const handleShow = (): void => {
		setItemActive('none');
		setAboutVisible(true);
	};

	const handleExitWindow = (): void => {
		setAboutVisible(false);
	};

	return (
		<>
			<div className='navbar-menu'>
				<NavbarButton onClick={handleShow}>about us</NavbarButton>
				<span className='separator'></span>
				<NavbarButton onClick={handleExit}>exit</NavbarButton>
			</div>

			<AboutUsWindow isShowing={aboutVisible} onClose={handleExitWindow} />
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
			<div id='navbar-container' onClick={(event) => event.stopPropagation()}>
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
