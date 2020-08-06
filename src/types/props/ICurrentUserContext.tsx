import { StartFormSchema } from '../form-schemas';

export interface ICurrentUserContext {
    name: string;
    lastName: string;
    email: string;
    userLoggedIn: boolean;
}

export interface ICurrentUserContextUpdaters {
    setUser: (user: StartFormSchema) => void;
    resetUser: () => void;
}
