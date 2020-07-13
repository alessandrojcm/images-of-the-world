import * as React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Navbar from '../src/components/Navbar';

describe('Navbar testing suite', () => {
    it('Should render', () => {
        render(<Navbar />);
    });
});
