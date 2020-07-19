import { TreeProps } from '@react-stately/tree';
import { HTMLAttributes, Key } from 'react';
import type { FocusStrategy } from '@react-types/shared';

export interface IDropdownTriggerProps extends TreeProps<any> {
    onClose?: () => void;
    onSelect: (key: Key) => void;
    autoFocus: FocusStrategy;
    domProps: HTMLAttributes<HTMLElement>;
    label: string;
}
