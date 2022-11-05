import '../../styles/windows/AboutUsWindow.css';

import SubWindow from '../ui/SubWindow';
import Button from '../ui/Button';

interface props {
	isShowing: boolean;
	onClose: () => void;
}

export default function AboutUsWindow({ isShowing, onClose }: props): JSX.Element {
	if (!isShowing) return <></>;

	const handleClose = (): void => {
		onClose();
	};

	return (
		<>
			<SubWindow onClose={handleClose}>
				<div className='about-us'>
					<div className='main-section'>
						<p className='text'>
							Este proyecto fue hecho con mucho amor por parte de Tomas Panqueva para la asignatura
							de Modelos Matematicos para la informatica en la Escuela Colombiana de Ingenieria
						</p>
					</div>
					<Button className='button' onClick={handleClose}>
						Close
					</Button>
					<Button className='button' main>
						Go To Github
					</Button>
				</div>
			</SubWindow>
		</>
	);
}
