import '../styles/App.css';

import { setItemActive } from '../stores/navbar';

import Instructions from './main/Instructions';
import Controls from './main/Controls';
import Navbar from './navbar/Navbar';
import Ribbon from './main/Ribbon';
import Steps from './main/Steps';

export default function App(): JSX.Element {
	const closeNavbar = (): void => {
		setItemActive('none');
	};

	return (
		<>
			<div id='main-container' onClick={closeNavbar}>
				<Navbar />
				<Ribbon />
				<Controls />
				<Instructions />
				<Steps />
			</div>
		</>
	);
}
