import React, { useRef } from 'react';
import { useMenuTrigger } from '@react-aria/menu';
import { useMenuTriggerState } from '@react-stately/menu';
import { useButton } from '@react-aria/button';
import { GoSettings } from 'react-icons/go';

import { IDropdownProps } from '~types/props';
import tailwind from '../../../tailwind.config.js';
import DropdownTrigger from './DropdownTrigger';

const Dropdown: React.FC<IDropdownProps> = (props) => {
    const { strokeColor = tailwind.theme.colors.primary, ...rest } = props;
    const state = useMenuTriggerState(rest);

    const ref = useRef(null);
    const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);
    const { buttonProps } = useButton(menuTriggerProps, ref);
    return (
        <div>
            <button type="button" {...buttonProps} ref={ref} title="Menu">
                <GoSettings color={strokeColor} />
            </button>
            {state.isOpen && (
                <DropdownTrigger {...rest} domProps={menuProps} autoFocus={state.focusStrategy} onClose={() => state.close()}>
                    {rest.children ? rest.children : []}
                </DropdownTrigger>
            )}
        </div>
    );
};

export default Dropdown;
