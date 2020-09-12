import { IJourneyState } from '~types/models';

export const POINTS_PER_IMAGE = 3;

export const initialState: IJourneyState = {
    id: undefined,
    searchTerm: null,
    winner: null,
    sellers: {},
};

export default (state: IJourneyState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'ADD_SELLERS':
            return {
                ...state,
                sellers: { ...action.payload },
            };
        case 'RESET':
            return initialState;
        case 'ADD_WINNER':
            return {
                ...state,
                winner: { ...action.payload },
            };
        case 'SEARCH':
            return {
                ...state,
                searchTerm: action.payload,
            };
        case 'RESET_SEARCH':
            return {
                ...state,
                searchTerm: null,
            };
        default:
            return state;
    }
};
