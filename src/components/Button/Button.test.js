import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import React from 'react';

test('renders button element', () => {
    render(<Button />);
    const inputElement = screen.getByRole('button');
    expect(inputElement).toBeInTheDocument();
});

test('click button', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
});
