import React, { useMemo, useRef, useState } from 'react';
import { useMenuItem } from '@react-aria/menu';
import { mergeProps } from '@react-aria/utils';
import { useFocus } from '@react-aria/interactions';
import tw, { css } from 'twin.macro';

import { IDropdownItemProps } from 'types/props/dropdown';

const DropdownItem: React.FC<IDropdownItemProps> = (props) => {
    const { item, disabled = false, state, onSelect, onClose = () => {} } = props;

    const itemRef = useRef<HTMLLIElement>(null);
    const [isFocused, setFocused] = useState(false);
    const isSelected = useMemo(() => item.key && state.selectionManager.selectedKeys.has(item.key.toString()), [item.key, state]);
    const { menuItemProps } = useMenuItem(
        {
            key: item.key,
            isDisabled: disabled,
            onAction: onSelect,
            onClose,
        },
        state,
        itemRef
    );
    const { focusProps } = useFocus({ onFocusChange: setFocused });

    return (
        <li
            {...mergeProps(menuItemProps, focusProps)}
            ref={itemRef}
            css={css`
                ${tw`
               py-1
               hover:text-yellow
               `}
                ${isFocused && !isSelected ? tw`hover:text-yellow cursor-pointer` : `text-primary`}
            `}>
            {item.rendered}
        </li>
    );
};

export default DropdownItem;
