import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import userEvent from '@testing-library/user-event';
import { Dropdown, Item } from '../src/components/dropdown';

describe('Dropdown component test suite', () => {
    it('should render and have level', () => {
        render(<Dropdown onSelect={jest.fn} label="Dropdown" />);
    });

    it('should render items on open', () => {
        render(
            <Dropdown onSelect={jest.fn} label="Dropdown">
                <Item key="i1">Item 1</Item>
            </Dropdown>
        );
        act(() => {
            userEvent.click(screen.getByText('Menu'));
        });
        expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('should call onSelect with key', () => {
        const onSelect = jest.fn();
        render(
            <Dropdown onSelect={onSelect} label="Dropdown">
                <Item key="i1">Item 1</Item>
            </Dropdown>
        );
        act(() => {
            userEvent.click(screen.getByText('Menu'));
        });

        waitFor(() => expect(screen.getByText('Item 1')).toBeInTheDocument());

        act(() => {
            userEvent.click(screen.getByText('Item 1'));
        });

        expect(onSelect).toBeCalledWith('i1');
    });
});
