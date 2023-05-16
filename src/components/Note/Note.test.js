import { render } from '@testing-library/react';
import React from 'react'
import Note from './Note';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore(); // создаем mock store

test('render Note with text', () => {
    const mockNote = {
        description: 'Test description',
        title: 'Test title',
    };

    const store = mockStore({

    })

    const { getByText } = render(
        <Provider store={store}><Note {...mockNote} /></Provider>);

    expect(getByText('Test title')).toBeInTheDocument();
    expect(getByText('Test description')).toBeInTheDocument();
});
