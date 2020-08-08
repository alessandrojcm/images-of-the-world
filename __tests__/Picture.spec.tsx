import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Picture from '../src/components/Picture';

describe('Picture test suite', () => {
    it('should render', () => {
        render(<Picture photoId="eMylnOiSJx0" width={512} />);
    });

    it('should have alt', async () => {
        render(<Picture photoId="eMylnOiSJx0" width={512} />);

        // Wait for msw to return response
        await waitFor(() => {
            expect(screen.getByAltText(/[a-zA-Z]/)).toBeInTheDocument();
        });
        expect(screen.getByAltText(/[a-zA-Z]/)).toBeInTheDocument();
    });
});
