import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './utils/TestWrapper';

import Picture from '../src/components/Picture';

describe('Picture test suite', () => {
    it('should render', () => {
        render(
            <TestWrapper>
                <Picture photo={{ id: 'a' }} width={512} onClick={jest.fn} />
            </TestWrapper>
        );
    });

    it('should have alt', async () => {
        render(
            <TestWrapper>
                <Picture photo={{ id: 'a' }} width={512} onClick={jest.fn} />
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

    it('Should show content loader if photo id is not defined', async () => {
        const { rerender } = render(
            <TestWrapper>
                <Picture photo={undefined} width={512} onClick={jest.fn} />
            </TestWrapper>
        );

        expect(screen.getByTitle('Select an image.')).toBeInTheDocument();

        // Rerender to fetch the image
        rerender(
            <TestWrapper>
                <Picture photo={{ id: 'a' }} width={512} onClick={jest.fn} />
            </TestWrapper>
        );

        // Wait for msw to return response
        await waitFor(
            () => {
                expect(screen.getByAltText(/[a-zA-Z]/)).toBeInTheDocument();
            },
            { timeout: 1250 }
        );

        // Rerender to force the content loader
        rerender(
            <TestWrapper>
                <Picture photo={undefined} width={512} onClick={jest.fn} />
            </TestWrapper>
        );
        await waitFor(() => {}, { timeout: 250 });
        expect(screen.getByTitle('Select an image.')).toBeInTheDocument();
    });
});
