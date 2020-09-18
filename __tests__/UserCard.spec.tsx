import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import UserCard from '../src/components/UserCard';

describe('UserCard test suite', () => {
    it('should render', () => {
        render(<UserCard journeyId="aid" />);
    });

    it('Should render seller', async () => {
        render(<UserCard journeyId="aid" />);

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

        expect(screen.getByText('aname')).toBeInTheDocument();
    });
});
