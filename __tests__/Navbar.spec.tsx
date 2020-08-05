import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './utils/TestWrapper';
import Navbar from '../src/components/Navbar';

describe('Navbar testing suite', () => {
    it('Should render', () => {
        render(
            <TestWrapper>
                <Navbar />
            </TestWrapper>
        );
    });
});
