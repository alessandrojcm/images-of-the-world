import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import SellersList from '../src/components/SellersList';

describe('SellersList test suite', () => {
    it('should render', () => {
        render(<SellersList journeyId="aid" />);
    });

    it('Should render seller', async () => {
        render(<SellersList journeyId="aid" />);

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        expect(await screen.findAllByText(new RegExp(/\d+/)).then((r) => r.length)).toBeGreaterThanOrEqual(3);
    });
});
