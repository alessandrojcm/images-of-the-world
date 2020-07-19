import type { MenuTriggerProps } from '@react-types/menu';
import type { Animation } from 'react-useanimations/utils';
import type { CollectionChildren } from '@react-types/shared';
import { Key } from 'react';

export interface IDropdownProps extends MenuTriggerProps {
    button?: Animation;
    strokeColor?: string;
    onSelect: (key: Key) => void;
    children?: CollectionChildren<any>;
    label: string;
}
