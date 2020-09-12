import { StartFormSchema } from '../form-schemas';

export interface ICurrentUserContext {
    journeyId: string;
    name?: string;
    lastName?: string;
    email?: string;
    userLoggedIn: boolean;
    loading: boolean;
}

export interface ICurrentUserContextUpdaters {
    setUser: (user: StartFormSchema) => void;
    resetUser: () => void;
}
