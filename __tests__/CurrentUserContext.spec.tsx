import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { act, renderHook } from '@testing-library/react-hooks';

import { useCurrentUser, useCurrentUserDispatchers } from '../src/context/CurrentUserContext';
import { CurrentUserWrapper } from './utils/TestWrapper';

const wrapper: React.FC = ({ children }) => <CurrentUserWrapper>{children}</CurrentUserWrapper>;

describe('CurrentUserContext test suite', () => {
    it('Should render', () => {
        renderHook(() => useCurrentUser(), { wrapper });
    });

    it('Should create a journey', async () => {
        const { result, waitForValueToChange } = renderHook(
            () => {
                const dispatchers = useCurrentUserDispatchers();
                const state = useCurrentUser();

                return { dispatchers, state };
            },
            { wrapper }
        );

        act(() =>
            result.current.dispatchers.setUser({
                name: 'aname',
                lastName: 'lastanme',
                email: 'email@email.com',
            })
        );

        await waitForValueToChange(() => result.current.state.userLoggedIn);

        expect(result.current.state.userLoggedIn).toBe(true);
        expect(result.current.state.journeyId).toEqual('aid');
    });

    it('Should reset state', () => {
        const { result } = renderHook(
            () => {
                const dispatchers = useCurrentUserDispatchers();
                const state = useCurrentUser();

                return { dispatchers, state };
            },
            { wrapper }
        );

        act(() =>
            result.current.dispatchers.setUser({
                name: 'aname',
                lastName: 'lastanme',
                email: 'email@email.com',
            })
        );

        act(() => {
            result.current.dispatchers.resetUser();
        });

        expect(result.current.state.userLoggedIn).toBe(false);
        expect(result.current.state.journeyId).toEqual('');
    });
});
