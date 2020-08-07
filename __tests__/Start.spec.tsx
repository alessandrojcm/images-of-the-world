import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import TestWrapper from './utils/TestWrapper';
import Registration from '../src/views/Registration';

describe('Registration test suite', () => {
    it('should render', async () => {
        await render(
            <TestWrapper>
                <Registration />
            </TestWrapper>
        );
    });

    it('Should not allow submit without filling fields', async () => {
        render(
            <TestWrapper>
                <Registration />
            </TestWrapper>
        );
        await waitFor(() => {});

        expect(screen.getByText('Go ahead!')).toBeDisabled();
    });

    it('Should enable the button if form is filled correctly', async () => {
        render(
            <TestWrapper>
                <Registration />
            </TestWrapper>
        );
        await waitFor(() => {});

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Name'), 'John');
            await userEvent.type(screen.getByLabelText('Last name'), 'Doe');
            await userEvent.type(screen.getByLabelText('Email'), 'somebody@example.com');
        });

        expect(screen.getByText('Go ahead!')).not.toBeDisabled();
    });

    it('Should not enabled button if form is filled incorrectly', async () => {
        render(
            <TestWrapper>
                <Registration />
            </TestWrapper>
        );
        await waitFor(() => {});

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Name'), 'J');
            await userEvent.type(screen.getByLabelText('Last name'), 'Do');
            await userEvent.type(screen.getByLabelText('Email'), 'somebody@.com');
        });

        expect(screen.getByText('Go ahead!')).toBeDisabled();
    });
});
