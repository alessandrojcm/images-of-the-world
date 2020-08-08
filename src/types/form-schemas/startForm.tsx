import * as yup from 'yup';

export const startFormSchema = yup.object({
    name: yup.string().min(2, 'tooShort').required('required'),
    lastName: yup.string().min(2, 'tooShort').required('required'),
    email: yup.string().email('invalid').required('required'),
});

export type StartFormSchema = yup.InferType<typeof startFormSchema>;
