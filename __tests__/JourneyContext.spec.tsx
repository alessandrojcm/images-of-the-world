import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import JourneyContext, { useJourneyState } from '../src/context/JourneyStateContext';

// @ts-ignore
const wrapper = ({ children }) => <JourneyContext>{children}</JourneyContext>;

describe('JourneyContext test suite', () => {
    it('Should render', () => {
        renderHook(() => useJourneyState(), { wrapper });
    });

    // Only testing this since involves async, other tests cases
    // would be really testing useReducer
    it('Should get sellers', async () => {
        const { result, waitForValueToChange } = renderHook(() => useJourneyState(), { wrapper });

        await waitForValueToChange(() => {
            return result.current && result.current.sellers;
        });

        expect(Object.keys(result.current.sellers).length).toBeGreaterThanOrEqual(3);
    });
});
