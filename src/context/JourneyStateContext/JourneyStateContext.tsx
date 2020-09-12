import React, { createContext, useCallback, useContext, useReducer } from 'react';

import { QueryConfig, useQuery, useMutation } from 'react-query';
import { useRouteMatch } from 'react-router-dom';

import { IImageSeller, IJourneyDispatchers, IJourneyState } from '~types/models';
import reducer, { initialState, POINTS_PER_IMAGE } from './journeyStateReducer';
import { addPointsToSeller, getSellers } from '../../core/apis/iotwApi';

const commonQueryOptions: QueryConfig<any> = {
    retry: 5,
    retryDelay: (retryAttempt: number) => retryAttempt * 5,
};

const JourneyState = createContext<IJourneyState>(initialState);
const JourneyDispatchers = createContext<IJourneyDispatchers | null>(null);

// TODO: error boundary
const JourneyContext: React.FC<{ journeyId: string }> = (props) => {
    const { children, journeyId } = props;
    const [state, dispatch] = useReducer(reducer, { ...initialState, id: journeyId });
    // TODO: change this
    const matches = useRouteMatch('/journey/start');
    const loadSellers = useCallback((sellers) => dispatch({ type: 'ADD_SELLERS', payload: sellers }), [dispatch]);

    const [mutate, { reset }] = useMutation((seller: Omit<IImageSeller, 'sellerName'>) => {
        return addPointsToSeller(journeyId, seller).toPromise();
    });

    const dispatchers: IJourneyDispatchers = {
        loadSellers,
        reset: useCallback(() => {
            reset();
            dispatch({ type: 'RESET' });
        }, []),
        imageChosen: useCallback(
            (sellerId, imageId: string) => {
                const { collectedImages, points } = state.sellers[sellerId] as IImageSeller;
                mutate({
                    id: sellerId,
                    points: points + POINTS_PER_IMAGE,
                    collectedImages: [...collectedImages, imageId],
                }).then((res) => {
                    if (!res) {
                        return;
                    }
                    loadSellers(res.sellers);
                    dispatch({ type: 'RESET_SEARCH' });
                    if (res.winner) {
                        dispatch({ type: 'ADD_WINNER', payload: res.winner });
                    }
                });
            },
            [dispatch, loadSellers, state.sellers]
        ),
        searchTerm: useCallback((term: string) => dispatch({ type: 'SEARCH', payload: term }), [dispatch]),
    };
    // TODO: Error handling for sellers fetch
    // TODO: Handle refetch, currently there is none because it will overwrite the client-side
    useQuery(journeyId, (id: string) => getSellers(id).toPromise(), {
        ...commonQueryOptions,
        refetchInterval: Infinity,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (Boolean(matches) || Object.keys(state.sellers).length > 0) && Boolean(journeyId),
        onSuccess: (res: Record<string, IImageSeller>) => dispatchers.loadSellers(res),
    });

    return (
        <JourneyState.Provider value={state}>
            <JourneyDispatchers.Provider value={dispatchers}>{children}</JourneyDispatchers.Provider>
        </JourneyState.Provider>
    );
};

const useJourneyState = () => {
    const context = useContext(JourneyState);

    if (context === undefined) {
        throw new Error('useJourneyState must be used within a JourneyStateContext');
    }

    return context as IJourneyState;
};

const useJourneyDispatchers = () => {
    const context = useContext(JourneyDispatchers);

    if (context === undefined) {
        throw new Error('useJourneyState must be used within a JourneyStateContext');
    }

    return context as IJourneyDispatchers;
};

export default JourneyContext;

export { useJourneyState, useJourneyDispatchers };
