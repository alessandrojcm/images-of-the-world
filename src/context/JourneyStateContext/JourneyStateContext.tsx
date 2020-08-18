import React, { createContext, useCallback, useContext, useReducer, useEffect } from 'react';

import { QueryOptions, useQuery } from 'react-query';
import { useId } from '@react-aria/utils';
import { useRouteMatch } from 'react-router-dom';

import { IImageSeller, IJourneyDispatchers, IJourneyState } from '~types/models';
import reducer, { initialState } from './journeyStateReducer';
import { getSellers } from '../../core/apis/iotwApi';

const commonQueryOptions: QueryOptions<any> = {
    retry: 5,
    retryDelay: (retryAttempt) => retryAttempt * 5,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
};

const JourneyState = createContext<IJourneyState>(initialState);
const JourneyDispatchers = createContext<IJourneyDispatchers | null>(null);

// TODO: error boundary
const JourneyContext: React.FC = (props) => {
    const { children } = props;
    const id = useId();
    const [state, dispatch] = useReducer(reducer, { ...initialState, searchTerm: 'cat' });
    // TODO: change this
    const matches = useRouteMatch('/journey/start');

    const dispatchers: IJourneyDispatchers = {
        loadSellers: useCallback((sellers) => dispatch({ type: 'ADD_SELLERS', payload: sellers }), [dispatch]),
        reset: useCallback(() => dispatch({ type: 'RESET' }), []),
        imageChosen: useCallback((sellerId) => dispatch({ type: 'IMAGE_CHOSEN', payload: sellerId }), [dispatch]),
    };
    // TODO: Error handling for sellers fetch
    // TODO: Journey key should be get from server side
    const { refetch } = useQuery(id, () => getSellers.toPromise(), {
        ...commonQueryOptions,
        enabled: Boolean(matches),
        onSuccess: (res: IImageSeller[]) => dispatchers.loadSellers(res),
        onError: () => {},
    });

    useEffect(() => {
        if (!matches) {
            return;
        }
        refetch();
    }, [matches]);

    return (
        <JourneyState.Provider value={state}>
            <JourneyDispatchers.Provider value={dispatchers}>{children}</JourneyDispatchers.Provider>
        </JourneyState.Provider>
    );
};

const useJourneyState = () => {
    return useContext(JourneyState) as IJourneyState;
};

const useJourneyDispatchers = () => {
    return useContext(JourneyDispatchers);
};

export default JourneyContext;

export { useJourneyState, useJourneyDispatchers };
