import React, { useRef } from 'react';

import { useButton } from '@react-aria/button';
import tw, { styled } from 'twin.macro';

import { IButtonProps } from '~types/props';

const Style = styled.button`
    ${tw`
        rounded border-2 w-auto font-body h-auto
        disabled:bg-opacity-25 disabled:border-opacity-25 disabled:cursor-not-allowed
        first:px-2
    `}
`;

const Button: React.FC<IButtonProps> = (props) => {
    const { disabled, as = 'button', children, onClick = () => {}, className, ...rest } = props;

    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(
        {
            ...rest,
            elementType: as,
            isDisabled: disabled,
            onPress: onClick,
        },
        ref
    );

    return (
        <Style {...buttonProps} ref={ref} className={className}>
            {children}
        </Style>
    );
};

export const PrimaryButton = styled(Button)`
    ${tw`
        border-primary
        bg-primary
        p-1
    `}
    ${(props) => (props.disabled ? 'bg-opacity-25 border-opacity-25' : tw`hover:text-orange-100 hover:text-shadow`)};
`;

export const IconButton = styled(Button)`
    ${tw`border-none`}
`;

export default Button;
