import React, { createContext, useCallback, useContext, useState } from 'react';
import { useMutation } from 'react-query';

import { ICurrentUserContext, ICurrentUserContextUpdaters } from '../../types/props';
import { createJourney } from '../../core/apis/iotwApi';

const UserContext = createContext<ICurrentUserContext>({
    journeyId: '',
    name: '',
    lastName: '',
    userLoggedIn: false,
    loading: false,
});

const DispatchUserContext = createContext<ICurrentUserContextUpdaters>({
    setUser: () => {},
    resetUser: () => {},
});

const CurrentUserContext: React.FC = (props) => {
    const { children } = props;
    const [mutate, { data, isLoading: loading, reset, error }] = useMutation((user: Omit<ICurrentUserContext, 'loading' | 'userLoggedIn' | 'journeyId'>) => {
        return createJourney(user).toPromise();
    });
    const [journeyId, setJourneyId] = useState('');
    const [context, setContext] = useState<Omit<ICurrentUserContext, 'journeyId'>>({
        ...data?.user,
        userLoggedIn: false,
        loading,
        error,
    });

    const userContextUpdater: ICurrentUserContextUpdaters = {
        setUser: useCallback(
            (user) => {
                mutate(user).then((res) => {
                    if (!res) {
                        return;
                    }
                    const { id, user: savedUser } = res;
                    setJourneyId(id as string);
                    setContext({ ...savedUser, userLoggedIn: true, loading: false });
                });
            },
            [mutate, loading, setContext, setJourneyId]
        ),
        resetUser: useCallback(() => {
            reset();
            setContext({ userLoggedIn: false, loading: false });
            setJourneyId('');
        }, [reset, setContext, setJourneyId]),
    };

    return (
        <UserContext.Provider value={{ ...context, journeyId }}>
            <DispatchUserContext.Provider value={userContextUpdater}>{children}</DispatchUserContext.Provider>
        </UserContext.Provider>
    );
};

const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useCurrentUser must be used within a UserContext');
    }

    return context as ICurrentUserContext;
};

const useCurrentUserDispatchers = () => {
    const context = React.useContext(DispatchUserContext);

    if (context === undefined) {
        throw new Error('useCurrentUserDispatchers must be used within a UserContext');
    }

    return context;
};

export default CurrentUserContext;
export { useCurrentUser, useCurrentUserDispatchers };
