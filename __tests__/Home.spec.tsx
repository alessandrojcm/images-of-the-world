import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import TestWrapper from './utils/TestWrapper';

import Home from '../src/views/Home';

describe('Home test suite', () => {
    it('should render', () => {
        render(
            <TestWrapper>
                <Home />
            </TestWrapper>
        );
    });
});
