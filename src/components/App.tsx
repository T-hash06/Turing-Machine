import { setItemActive } from '../stores/navbar';
import '../styles/App.css';

import Navbar from './navbar/Navbar';

export default function App(): JSX.Element {
	const mainClick = (): void => {
		setItemActive('none');
	};

	return (
		<>
			<div id='main-container'>
				<Navbar />
				<div id='content-container' onClick={mainClick}>
					<h1>Hola mundo</h1>
				</div>
			</div>
		</>
	);
}
