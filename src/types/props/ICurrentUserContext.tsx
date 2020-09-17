import { StartFormSchema } from '../form-schemas';

export interface IJourneyUser {
    name?: string;
    lastName?: string;
    email?: string;
}

export interface ICurrentUserContext extends IJourneyUser {
    journeyId: string;
    userLoggedIn: boolean;
    loading: boolean;
}

export interface ICurrentUserContextUpdaters {
    setUser: (user: StartFormSchema) => void;
    resetUser: () => void;
}
