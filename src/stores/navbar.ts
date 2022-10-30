import { atom } from 'nanostores';

export const itemActive = atom<NavbarOption>('none');

export function setItemActive(label: NavbarOption): void {
	itemActive.set(label);
}
