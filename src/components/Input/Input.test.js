import { render, screen } from '@testing-library/react';
import Input from './Input';
import React from 'react';

test('renders input element', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
});

test('applies custom className', () => {
    render(<Input className="custom-input" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-input');
});
