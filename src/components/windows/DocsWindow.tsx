import '../../styles/windows/DocsWindow.css';

import { currentDoc, setCurrentDoc } from '../../stores/docs';
import { useStore } from '@nanostores/react';
import { useRef } from 'react';

import NamedSection from '../ui/NamedSection';
import SubWindow from '../ui/SubWindow';
import Button from '../ui/Button';

interface props extends SubWindowProps {}

export default function DocsWindow({ isShowing, onClose }: props): JSX.Element {
	const autorRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const preRef = useRef<HTMLTextAreaElement>(null);
	const postRef = useRef<HTMLTextAreaElement>(null);
	const strategyRef = useRef<HTMLTextAreaElement>(null);
	const commentRef = useRef<HTMLTextAreaElement>(null);

	const refs = [autorRef, nameRef, preRef, postRef, strategyRef, commentRef];

	const doc = useStore(currentDoc);

	const handleSave = (): void => {
		const newDoc: Partial<DocInterface> = {};

		for (const ref of refs) {
			if (ref.current === null) return;

			newDoc[ref.current.title as keyof DocInterface] = ref.current.value;
		}

		setCurrentDoc(newDoc as DocInterface);
		onClose();
	};
	if (!isShowing) return <></>;

	return (
		<>
			<SubWindow onClose={onClose}>
				<div className='docs-container'>
					<div className='fields-container'>
						<NamedSection className='section' name='Program Name'>
							<input className='input' ref={nameRef} title='name' defaultValue={doc.name}></input>
						</NamedSection>
						<NamedSection className='section' name='Autor'>
							<input
								className='input'
								ref={autorRef}
								title='autor'
								defaultValue={doc.autor}
							></input>
						</NamedSection>
						<NamedSection className='section' name='Pre Condition'>
							<textarea
								className='text-area'
								title='preCondition'
								defaultValue={doc.preCondition}
								maxLength={140}
								ref={preRef}
							></textarea>
						</NamedSection>
						<NamedSection className='section' name='Strategy'>
							<textarea
								className='text-area'
								title='strategy'
								defaultValue={doc.strategy}
								ref={strategyRef}
								maxLength={140}
							></textarea>
						</NamedSection>
						<NamedSection className='section' name='Post Condition'>
							<textarea
								className='text-area'
								title='postCondition'
								defaultValue={doc.postCondition}
								maxLength={140}
								ref={postRef}
							></textarea>
						</NamedSection>
						<NamedSection className='section' name='Comment'>
							<textarea
								maxLength={140}
								className='text-area'
								defaultValue={doc.comment}
								ref={commentRef}
								title='comment'
							></textarea>
						</NamedSection>
						<Button className='button' onClick={() => onClose()}>
							Close
						</Button>
						<Button className='button' onClick={() => handleSave()} main>
							Save
						</Button>
					</div>
				</div>
			</SubWindow>
		</>
	);
}
