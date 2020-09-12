import reducer, { initialState } from '../src/context/JourneyStateContext/journeyStateReducer';
import { IImageSeller, IJourneyState } from '../src/types/models';

const sellers: IImageSeller[] = Array.from({ length: 3 }).map((_, i) => ({
    id: i.toString(),
    sellerName: `${i}`,
    points: 0,
    collectedImages: [],
}));

const getSellersDict = (s: IImageSeller[]) =>
    // @ts-ignore
    s.reduce(
        (prv: Pick<IJourneyState, 'sellers'>, curr: IImageSeller) => ({
            ...prv,
            [curr.id]: curr,
        }),
        {}
    );

describe('Journey reducer test suite', () => {
    it('It should add sellers', () => {
        const state = reducer(initialState, { type: 'ADD_SELLERS', payload: sellers });

        expect(state.sellers).toEqual(getSellersDict(sellers));
    });

    it('Should reset', () => {
        const state = reducer(initialState, { type: 'RESET' });

        expect(state).toEqual(initialState);
    });

    it('Should render search term', () => {
        const state = reducer(initialState, { type: 'SEARCH', payload: 'cat' });

        expect(state.searchTerm).toEqual('cat');
    });

    it('Should reset search term', () => {
        const state = reducer(initialState, { type: 'RESET_SEARCH' });

        expect(state.searchTerm).toBeNull();
    });
});
