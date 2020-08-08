import React, { useRef } from 'react';
import { useTreeState } from '@react-stately/tree';
import { useMenu } from '@react-aria/menu';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import tw from 'twin.macro';

import { IDropdownTriggerProps } from 'types/props/dropdown';
import DropdownItem from './DropdownItem';

const StyledMenu = tw.ul`transition-opacity animation-slide-down animation-2s animation-ease border-0 right-0 absolute pr-3`;

const DropdownTrigger: React.FC<IDropdownTriggerProps> = (props) => {
    const { onClose = () => {}, onSelect, domProps, ...rest } = props;

    const state = useTreeState({ ...rest, selectionMode: 'none' });
    const triggerRef = useRef<HTMLUListElement>(null);
    const { menuProps } = useMenu({ ...rest, 'aria-label': rest.label }, state, triggerRef);

    const overlayRef = useRef<HTMLDivElement>(null);
    const { overlayProps } = useOverlay(
        {
            onClose,
            shouldCloseOnBlur: true,
            isOpen: true,
            isDismissable: true,
        },
        overlayRef
    );

    return (
        <FocusScope restoreFocus>
            <div {...overlayProps} ref={overlayRef}>
                <DismissButton onDismiss={onClose} />
                <StyledMenu {...mergeProps(menuProps, domProps)} ref={triggerRef}>
                    {[...state.collection].map((item) => (
                        <DropdownItem key={item.key} item={item} onSelect={onSelect} onClose={onClose} state={state} />
                    ))}
                </StyledMenu>
                <DismissButton onDismiss={onClose} />
            </div>
        </FocusScope>
    );
};

export default DropdownTrigger;
