import React, { useEffect } from 'react';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { IImageSeller } from '../src/types/models';
import { TestJourneyContextWrapper } from './utils/TestWrapper';
import { useJourneyDispatchers } from '../src/context/JourneyStateContext';
import ImageOfTheWorld from '../src/components/ImageOfTheWorld';

const seller: IImageSeller = {
    id: 'id',
    collectedImages: [],
    points: 0,
    sellerName: 'aname',
};

const ImageWithSearchTerm = () => {
    const { setSearchTerm } = useJourneyDispatchers();

    useEffect(() => {
        setSearchTerm('cats');
    }, []);

    return <ImageOfTheWorld seller={seller} />;
};

describe('ImageOfTheWorld test suite', () => {
    it('should render', async () => {
        render(
            <TestJourneyContextWrapper>
                <ImageOfTheWorld seller={seller} />
            </TestJourneyContextWrapper>
        );
    });

    it.skip('should select image on click', async () => {
        render(
            <TestJourneyContextWrapper>
                <ImageWithSearchTerm />
            </TestJourneyContextWrapper>
        );

        await waitForElementToBeRemoved(() => screen.getByTitle('Select an image.'), { timeout: 1500 });

        await waitFor(
            () => {
                expect(screen.getByAltText(/[a-zA-Z]/)).toBeInTheDocument();
            },
            { timeout: 1250 }
        );

        act(() => {
            userEvent.click(screen.getByAltText('a photo'));
        });
    });
});
