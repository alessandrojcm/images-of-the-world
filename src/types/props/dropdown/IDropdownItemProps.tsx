import { TreeState } from '@react-stately/tree';
import type { Node } from '@react-types/shared';
import { Key } from 'react';

export interface IDropdownItemProps {
    item: Node<any>;
    disabled?: boolean;
    onClose?: () => void;
    onSelect: (key: Key) => void;
    state: TreeState<any>;
}
