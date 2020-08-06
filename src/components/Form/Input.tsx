import React from 'react';

import { useLabel } from '@react-aria/label';

import tw, { styled } from 'twin.macro';
import { IInputProps } from '~types/props/IInputProps';

const InputStyle = styled.input`
    ${tw`
        w-full
        bg-opacity-75
        bg-gold
        text-black
        rounded
        placeholder-black
        p-1
        border-2
        border-transparent
        disabled:bg-opacity-50 disabled:cursor-not-allowed
        hover:border-green
        focus:border-green
        active:border-green
    `};
    :invalid {
        ${tw`border-2 border-primary`}
    }
`;

const Label = styled.label`
    ${tw`text-shadow
    text-orange-200
    font-body
    font-bold`}
    ${(props: { labelVisible: boolean }) => (props.labelVisible ? '' : tw`invisible`)}
`;

const Input = React.forwardRef<any, IInputProps>((props, ref) => {
    const { inputName, required = false, labelVisible = true, type = 'text', label = 'label', placeholder } = props;

    const { labelProps, fieldProps } = useLabel({
        label,
        'aria-label': label,
        isRequired: required,
        id: inputName,
    });

    return (
        <>
            <Label labelVisible={labelVisible} {...labelProps}>
                {label}
            </Label>
            <InputStyle {...fieldProps} name={inputName} type={type} ref={ref} placeholder={placeholder} />
        </>
    );
});

export default Input;
