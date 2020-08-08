import React from 'react';

import { useLabel } from '@react-aria/label';
import { useTranslation } from 'react-i18next';

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
        placeholder-opacity-50
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

const ErrorMessage = tw.p`
  text-sm
  text-primary
  text-shadow
  font-thin
  pt-1
  mr-4
`;

const Input = React.forwardRef<any, IInputProps>((props, ref) => {
    const { inputName, required = false, labelVisible = true, type = 'text', label = 'label', placeholder, error = undefined } = props;
    const { t } = useTranslation();

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
            {error?.message && <ErrorMessage>{t(error.message, { val: t(error.type) })}</ErrorMessage>}
        </>
    );
});

export default Input;
