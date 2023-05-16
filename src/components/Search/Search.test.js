import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import React from 'react';

test('renders search element', () => {
    render(<Search />);
    const search = screen.getByTestId('search');
    expect(search).toBeInTheDocument();
});

test('query getting', () => {
    const mock = {
        query: 'Search'
    }
    render(<Search {...mock} />);
    expect(screen.getByDisplayValue('Search')).toBeInTheDocument();
});
