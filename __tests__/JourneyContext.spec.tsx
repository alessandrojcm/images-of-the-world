import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useJourneyDispatchers, useJourneyState } from '../src/context/JourneyStateContext';
import { TestJourneyContextWrapper } from './utils/TestWrapper';

const wrapper: React.FC = ({ children }) => <TestJourneyContextWrapper>{children}</TestJourneyContextWrapper>;

describe('JourneyContext test suite', () => {
    it('Should render', () => {
        renderHook(() => useJourneyState(), { wrapper });
    });

    // Only testing this since involves async, other tests cases
    // would be really testing useReducer
    it('Should get sellers', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useJourneyState(), { wrapper });

        await waitForNextUpdate({ timeout: 500 });

        expect(Object.keys(result.current.sellers).length).toBeGreaterThanOrEqual(3);
    });

    it('Should mutate sellers', async () => {
        const { result, waitFor, waitForValueToChange } = renderHook(
            () => {
                const state = useJourneyState();
                const dispatchers = useJourneyDispatchers();

                return { state, dispatchers };
            },
            { wrapper }
        );

        await waitFor(
            () => {
                expect(Object.keys(result.current.state.sellers).length).toBeGreaterThanOrEqual(3);
            },
            { timeout: 500 }
        );

        act(() => {
            result.current.dispatchers.imageChosen('0', 'aimage');
        });

        await waitForValueToChange(() => result.current.state.sellers);

        expect(result.current.state.sellers['0'].points).toBe(3);
        expect(result.current.state.sellers['1'].points).toBe(0);
        expect(result.current.state.sellers['2'].points).toBe(0);
    });
});
