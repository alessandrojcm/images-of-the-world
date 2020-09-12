import { IImageSeller } from '~types/models/IImageSeller';
import { ICurrentUserContext } from '~types/props';

export interface IJourneyState {
    id?: undefined | string;
    sellers?: Record<string, IImageSeller>;
    searchTerm: string | null;
    winner?: IImageSeller | null;
}

export interface IJourneyDispatchers {
    searchTerm: (term: string) => void;
    loadSellers: (sellers: Record<string, IImageSeller>) => void;
    imageChosen: (sellerId: string, imageId: string) => void;
    reset: () => void;
}

export interface IJourneyCreation extends Omit<IJourneyState, 'searchTerm'> {
    user: Omit<ICurrentUserContext, 'loading' | 'userLoggedIn'>;
}
