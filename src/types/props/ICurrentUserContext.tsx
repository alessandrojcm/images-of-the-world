import { StartFormSchema } from '../form-schemas';

export interface IJourneyUser {
    name?: string;
    lastName?: string;
}

export interface ICurrentUserContext extends IJourneyUser {
    journeyId: string;
    userLoggedIn: boolean;
    loading: boolean;
    error?: any;
}

export interface ICurrentUserContextUpdaters {
    setUser: (user: StartFormSchema) => void;
    resetUser: () => void;
}
