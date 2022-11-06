import '../../styles/main/Steps.css';

import { FaPlay, FaStop, FaForward } from 'react-icons/fa';
import { useRunStep } from '../../hooks/useRunner';
import { useEffect, useState } from 'react';

import InvalidInstructionWindow from '../windows/InvalidInstructionWindow';
import Button from '../ui/Button';

export default function Steps(): JSX.Element {
	const nextStep = useRunStep();

	const [isPlaying, setPlaying] = useState(false);
	const [invalidShowing, setInvalidShowing] = useState(false);

	const handleInvalidClose = (): void => {
		setInvalidShowing(false);
	};

	const handleStep = (): void => {
		const validInstruction = nextStep();

		if (validInstruction) return;

		setPlaying(false);
		setInvalidShowing(true);
	};

	const handlePlay = (): void => {
		setPlaying(!isPlaying);
	};

	const handleStop = (): void => {
		setPlaying(false);
	};

	useEffect(() => {
		const playIntervalId = setInterval(() => {
			if (!isPlaying) return;
			handleStep();
		}, 120);

		return () => clearInterval(playIntervalId);
	}, [isPlaying, handleStep]);

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

			<InvalidInstructionWindow isShowing={invalidShowing} onClose={handleInvalidClose} />
		</>
	);
}
