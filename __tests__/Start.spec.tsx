import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from 'react-toast-notifications';

import TestWrapper from './utils/TestWrapper';
import Registration from '../src/views/Registration';

const ToastWrapper: React.FC = ({ children }) => (
    <ToastProvider>
        <TestWrapper>{children}</TestWrapper>
    </ToastProvider>
);

describe('Registration test suite', () => {
    it('should render', async () => {
        await render(
            <ToastWrapper>
                <Registration />
            </ToastWrapper>
        );
    });

    it('Should not allow submit without filling fields', async () => {
        render(
            <ToastWrapper>
                <Registration />
            </ToastWrapper>
        );
        await waitFor(() => {});

        expect(screen.getByText('Go ahead!')).toBeDisabled();
    });

    it('Should enable the button if form is filled correctly', async () => {
        render(
            <ToastWrapper>
                <Registration />
            </ToastWrapper>
        );
        await waitFor(() => {});

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Name'), 'John');
            await userEvent.type(screen.getByLabelText('Last name'), 'Doe');
        });

        expect(screen.getByText('Go ahead!')).not.toBeDisabled();
    });

    it('Should not enabled button if form is filled incorrectly', async () => {
        render(
            <ToastWrapper>
                <Registration />
            </ToastWrapper>
        );
        await waitFor(() => {});

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Name'), 'J');
            await userEvent.type(screen.getByLabelText('Last name'), 'Do');
        });

        expect(screen.getByText('Go ahead!')).toBeDisabled();
    });
});
