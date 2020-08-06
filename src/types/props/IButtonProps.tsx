import { ReactHTML } from 'react';
import type { AriaButtonProps } from '@react-types/button';

export interface IButtonProps extends Omit<AriaButtonProps, 'elementType' | 'onPress'> {
    onClick?: () => void;
    disabled?: boolean;
    as?: keyof Pick<ReactHTML, 'a' | 'button' | 'span' | 'div'>;
    className?: any;
}
