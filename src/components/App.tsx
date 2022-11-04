import '../styles/App.css';

import Instructions from './main/Instructions';
import Controls from './main/Controls';
import Navbar from './navbar/Navbar';
import Ribbon from './main/Ribbon';
import Steps from './main/Steps';

export default function App(): JSX.Element {
	return (
		<>
			<div id='main-container'>
				<Navbar />
				<Ribbon />
				<Controls />
				<Instructions />
				<Steps />
			</div>
		</>
	);
}
