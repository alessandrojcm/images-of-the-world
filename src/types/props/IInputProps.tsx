import { FieldError } from 'react-hook-form';

export interface IInputProps {
    inputName: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    labelVisible?: boolean;
    type?: string;
    error?: FieldError;
}
