import type { MenuTriggerProps } from '@react-types/menu';
import type { CollectionChildren } from '@react-types/shared';
import { Key } from 'react';

export interface IDropdownProps extends MenuTriggerProps {
    strokeColor?: string;
    onSelect: (key: Key) => void;
    children?: CollectionChildren<any>;
    label: string;
}
