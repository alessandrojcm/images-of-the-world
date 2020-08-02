import React, { useRef } from 'react';

import { useButton } from '@react-aria/button';
import tw, { css } from 'twin.macro';

import { IButtonProps } from '~types/props';

const Button: React.FC<IButtonProps> = (props) => {
    const { disabled, as = 'button', children, onClick, className, ...rest } = props;

    const ref = useRef<HTMLElement>(null);
    const { buttonProps } = useButton(
        {
            ...rest,
            elementType: as,
            isDisabled: disabled,
            onPress: onClick,
        },
        ref
    );

    const styles = css`
        ${tw`w-auto font-body text-primary h-auto`}
    `;

    return React.createElement(as, { ...buttonProps, className, css: styles }, children);
};

export default Button;
