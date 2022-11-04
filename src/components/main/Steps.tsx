import '../../styles/Steps.css';

import { FaPlay, FaStop, FaForward } from 'react-icons/fa';
import { useRunStep } from '../../hooks/useRunner';

import Button from '../ui/Button';

export default function Steps(): JSX.Element {
	const nextStep = useRunStep();

	const handleStep = (): void => {
		nextStep();
	};
	return (
		<>
			<div id='steps-container'>
				<section className='border-section'></section>

				<div className='border-section'>
					<section className='buttons-section section'>
						<Button className='next-step' onClick={handleStep} main>
							Next Step
						</Button>
						<Button className='auto-control' onClick={handleStep}>
							<FaPlay />
						</Button>
						<Button className='auto-control' onClick={handleStep}>
							<FaStop />
						</Button>
						<Button className='auto-control' onClick={handleStep}>
							<FaForward />
						</Button>
					</section>
				</div>

				<section className='border-section'></section>
			</div>
		</>
	);
}
