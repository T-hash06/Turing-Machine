import { useStore } from '@nanostores/react';
import { pointerIndex } from '../stores/ribbon';

export function runStep(): void {
	const pointer = useStore(pointerIndex);
}
