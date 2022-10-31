import '../styles/App.css';

import Controls from './main/Controls';
import Navbar from './navbar/Navbar';
import Ribbon from './main/Ribbon';

export default function App(): JSX.Element {
	return (
		<>
			<div id='main-container'>
				<Navbar />
				<Ribbon />
				<Controls />
			</div>
		</>
	);
}
