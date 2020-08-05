import React from 'react';

import { useLabel } from '@react-aria/label';

import tw, { styled } from 'twin.macro';
import { IInputProps } from '~types/props/IInputProps';

const InputStyle = styled.input`
    ${tw`
        w-full
        bg-primary
        rounded
        placeholder-orange-200
        placeholder-opacity-75
        p-1
    `};
    ${(props) => (props.disabled ? tw`bg-opacity-50 cursor-not-allowed` : 'bg-opacity-100')}
`;

const Label = styled.label`
    ${tw`text-shadow
    font-body
    font-bold`}
    ${(props: { labelVisible: boolean }) => (props.labelVisible ? '' : tw`hidden`)}
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
