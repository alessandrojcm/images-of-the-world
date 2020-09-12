import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { QueryConfig, useQuery, useMutation, queryCache } from 'react-query';
import { useRouteMatch } from 'react-router-dom';

import { IImageSeller, IJourneyDispatchers, IJourneyState } from '~types/models';
import { addPointsToSeller, getJourneyState } from '../../core/apis/iotwApi';

export const POINTS_PER_IMAGE = 3;

const commonQueryOptions: QueryConfig<any> = {
    retry: 5,
    retryDelay: (retryAttempt: number) => retryAttempt * 5,
};

const JourneyState = createContext<IJourneyState | null>({
    searchTerm: null,
    sellers: {},
    id: undefined,
    winner: null,
});
const JourneyDispatchers = createContext<IJourneyDispatchers | null>(null);

// TODO: error boundary
const JourneyContext: React.FC<{ journeyId: string }> = (props) => {
    const { children, journeyId } = props;
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    // TODO: change this
    const matches = useRouteMatch('/journey/start');

    const [mutate, { reset }] = useMutation((seller: Omit<IImageSeller, 'sellerName'>) => {
        return addPointsToSeller(journeyId, seller).toPromise();
    });

    // TODO: Error handling for sellers fetch
    // TODO: Handle refetch, currently there is none because it will overwrite the client-side
    const { refetch, data: journeyState } = useQuery(journeyId, (id: string) => getJourneyState(id).toPromise(), {
        ...commonQueryOptions,
        refetchInterval: Infinity,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(matches) && Boolean(journeyId),
    });

    const dispatchers: IJourneyDispatchers = {
        loadSellers: refetch,
        reset: useCallback(() => {
            reset();
        }, []),
        imageChosen: useCallback(
            (sellerId, imageId: string) => {
                if (!journeyState?.sellers) {
                    return;
                }
                const { collectedImages, points } = journeyState.sellers[sellerId] as IImageSeller;
                mutate({
                    id: sellerId,
                    points: points + POINTS_PER_IMAGE,
                    collectedImages: [...collectedImages, imageId],
                }).then((res) => {
                    queryCache.setQueryData([journeyId], res);
                    queryCache.invalidateQueries(sellerId);
                });
            },
            [journeyState?.sellers]
        ),
        searchTerm: useCallback((term: string) => setSearchTerm(term), [setSearchTerm]),
    };

    const state: IJourneyState = useMemo(
        () => ({
            ...journeyState,
            searchTerm,
        }),
        [journeyState]
    );

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
