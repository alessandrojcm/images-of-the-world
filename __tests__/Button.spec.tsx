import React from 'react';
import { render, act, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Button from '../src/components/Button';
import userEvent from '@testing-library/user-event';

describe('Button test suite', () => {
    it('should render', () => {
        render(<Button onClick={jest.fn} />);
    });

    it('should click', () => {
        const click = jest.fn();
        render(<Button onClick={click}>Hi</Button>);

        act(() => {
            userEvent.click(screen.getByText('Hi'));
        });
        expect(click).toBeCalled();
    });
});
