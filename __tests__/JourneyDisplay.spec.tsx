import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import JourneyDisplay from '../src/components/JourneyMeter';
import { TestJourneyContextWrapper } from './utils/TestWrapper';

describe('JourneyDisplay test suite', () => {
    it('should render', () => {
        render(
            <TestJourneyContextWrapper>
                <JourneyDisplay />
            </TestJourneyContextWrapper>
        );
    });
});
