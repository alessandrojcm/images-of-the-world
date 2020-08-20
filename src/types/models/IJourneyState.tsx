import { IImageSeller } from '~types/models/IImageSeller';

export interface IJourneyState {
    sellers: Record<string, IImageSeller>;
    searchTerm: string | null;
    winner: IImageSeller | null;
}

export interface IJourneyDispatchers {
    searchTerm: (term: string) => void;
    loadSellers: (sellers: IImageSeller[]) => void;
    imageChosen: (sellerId: string, imageId: string) => void;
    reset: () => void;
}
