import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './utils/TestWrapper';

import Picture from '../src/components/Picture';

describe('Picture test suite', () => {
    it('should render', () => {
        render(
            <TestWrapper>
                <Picture photo={{ id: 'a' }} width={512} />
            </TestWrapper>
        );
    });

    it('should have alt', async () => {
        render(
            <TestWrapper>
                <Picture photo={{ id: 'a' }} width={512} />
            </TestWrapper>
        );

        // Wait for msw to return response
        await waitFor(
            () => {
                expect(screen.getByAltText(/[a-zA-Z]/)).toBeInTheDocument();
            },
            { timeout: 1250 }
        );
        expect(screen.getByAltText(/[a-zA-Z]/)).toBeInTheDocument();
    });
});
