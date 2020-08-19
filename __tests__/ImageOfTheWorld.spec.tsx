import React from 'react';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { IImageSeller } from '../src/types/models';
import { TestJourneyContextWrapper } from './utils/TestWrapper';
import ImageOfTheWorld from '../src/components/ImageOfTheWorld';

const seller: IImageSeller = {
    id: 'id',
    collectedImages: [],
    points: 0,
    sellerName: 'aname',
};

jest.setTimeout(15000);
describe('ImageOfTheWorld test suite', () => {
    it('should render', async () => {
        render(
            <TestJourneyContextWrapper>
                <ImageOfTheWorld seller={seller} />
            </TestJourneyContextWrapper>
        );
    });

    it('should select image on click', async () => {
        const { container } = render(
            <TestJourneyContextWrapper>
                <ImageOfTheWorld seller={seller} />
            </TestJourneyContextWrapper>
        );

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        await waitForElementToBeRemoved(() => container.querySelector('[aria-busy]'));

        await waitFor(
            () => {
                expect(screen.getByAltText(/[a-zA-Z]/)).toBeInTheDocument();
            },
            { timeout: 1250 }
        );

        await act(() => {
            userEvent.click(screen.getByAltText('a photo'));
        });
    });
});
