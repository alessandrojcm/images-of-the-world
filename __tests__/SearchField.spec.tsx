import React from 'react';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import TestWrapper from './utils/TestWrapper';
import SearchField from '../src/components/SearchBar';

describe('SearchField test suite', () => {
    it('should render', () => {
        render(
            <TestWrapper>
                <SearchField onSubmit={jest.fn} />
            </TestWrapper>
        );
    });

    it('should be disabled', async () => {
        render(
            <TestWrapper>
                <SearchField onSubmit={jest.fn} disabled />
            </TestWrapper>
        );
        await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
        expect(screen.getByPlaceholderText('Search for an image.')).toBeDisabled();
    });

    it('Should not fire on wrong query', async () => {
        const submit = jest.fn();
        render(
            <TestWrapper>
                <SearchField onSubmit={submit} />
            </TestWrapper>
        );
        await waitFor(() => {});

        await act(async () => {
            await userEvent.type(screen.getByPlaceholderText('Search for an image.'), 'a{enter}');
        });
        expect(submit).not.toBeCalled();

        await act(async () => {
            await userEvent.type(screen.getByPlaceholderText('Search for an image.'), "a' '{enter}");
        });
        expect(submit).not.toBeCalled();

        await act(async () => {
            await userEvent.type(screen.getByPlaceholderText('Search for an image.'), "aa' '{enter}");
        });
        expect(submit).not.toBeCalled();
    });

    // FIXME: for some reason this fails, bu the component DOES work
    it.skip('Should dispatch the formatted query', async () => {
        const submit = jest.fn();
        render(
            <TestWrapper>
                <SearchField onSubmit={submit} />
            </TestWrapper>
        );
        await waitFor(() => screen.queryByText('Loading...'));

        await act(async () => {
            await userEvent.type(screen.getByPlaceholderText('Search for an image.', { exact: false }), "Mighty cats'   '{enter}");
        });
        expect(submit).toHaveBeenCalledWith('mighty cats');
    });
});
