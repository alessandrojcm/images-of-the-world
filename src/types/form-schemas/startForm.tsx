import * as yup from 'yup';

import i18n from '../../core/i18n';

export const startFormSchema = yup.object({
    name: yup
        .string()
        .min(2, i18n.t('tooShort', { val: '$t(name)' }))
        .required(i18n.t('required', { val: '$t(name)' })),
    lastName: yup
        .string()
        .min(2, i18n.t('lastName', { val: '$t(name)' }))
        .required(i18n.t('required', { val: '$t(lastName)' })),
    email: yup
        .string()
        .email(i18n.t('invalid', { val: '$t(email)' }))
        .required(i18n.t('required', { val: '$t(email)' })),
});

export type StartFormSchema = yup.InferType<typeof startFormSchema>;
