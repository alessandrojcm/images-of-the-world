import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useJourneyState } from '../src/context/JourneyStateContext';
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

        await waitForNextUpdate({ timeout: 1250 });

        expect(Object.keys(result.current.sellers).length).toBeGreaterThanOrEqual(3);
    });
});
