import * as React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import App from '../src/components/App';

describe('testing jest', () => {
    it('should work', () => {
        render(<App />);
    });
});
