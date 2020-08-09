import { IImageSeller, IJourneyState } from '~types/models';

const POINTS_PER_IMAGE = 3;
const POINTS_TO_WIN = 20;

export const initialState: IJourneyState = {
    searchTerm: null,
    winner: null,
    sellers: {},
};

function imageChosen(state: IJourneyState, action: { type: string; payload?: any }) {
    const chosenSeller = state.sellers[action.payload.id];
    if (!chosenSeller) {
        return state;
    }

    if (chosenSeller.points + POINTS_PER_IMAGE >= POINTS_TO_WIN) {
        return {
            ...state,
            sellers: {
                ...state.sellers,
                [chosenSeller.id]: { ...chosenSeller, points: chosenSeller.points + POINTS_PER_IMAGE },
            },
            winner: chosenSeller,
        };
    }
    return {
        ...state,
        sellers: {
            ...state.sellers,
            [chosenSeller.id]: { ...chosenSeller, points: chosenSeller.points + POINTS_PER_IMAGE },
        },
    };
}

export default (state: IJourneyState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'ADD_SELLERS':
            return {
                ...state,
                sellers: action.payload.reduce(
                    (prv: Pick<IJourneyState, 'sellers'>, curr: IImageSeller) => ({
                        ...prv,
                        [curr.id]: curr,
                    }),
                    {}
                ),
            };
        case 'IMAGE_CHOSEN':
            return imageChosen(state, action);
        case 'RESET':
            return initialState;
        case 'SEARCH':
            return {
                ...state,
                searchTerm: action.payload,
            };
        default:
            return state;
    }
};
