import '../../styles/Steps.css';

import { FaPlay, FaStop, FaForward } from 'react-icons/fa';
import { useRunStep } from '../../hooks/useRunner';
import { useEffect, useState } from 'react';

import Button from '../ui/Button';

export default function Steps(): JSX.Element {
	const nextStep = useRunStep();

	const [isPlaying, setPlaying] = useState(false);

	useEffect(() => {
		const playIntervalId = setInterval(() => {
			if (!isPlaying) return;
			nextStep();
		}, 120);

		return () => clearInterval(playIntervalId);
	}, [isPlaying, nextStep]);

	const handleStep = (): void => {
		nextStep();
	};

	const handlePlay = (): void => {
		setPlaying(!isPlaying);
	};

	const handleStop = (): void => {
		setPlaying(false);
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
						<Button className='play auto-control' onClick={handlePlay} main={isPlaying}>
							<FaPlay />
						</Button>
						<Button className='stop auto-control' onClick={handleStop}>
							<FaStop />
						</Button>
						<Button className='speed auto-control'>
							<FaForward />
						</Button>
					</section>
				</div>

				<section className='border-section'></section>
			</div>
		</>
	);
}
