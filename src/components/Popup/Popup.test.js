import { render, screen, fireEvent } from '@testing-library/react';
import Popup from './Popup';
import React from 'react'

test('renders popup component', () => {
    const fnMock = jest.fn();
    render(<Popup closePopup={fnMock} setTitle={fnMock} setDescription={fnMock} />);
    const popupElement = screen.getByTestId('popup');
    expect(popupElement).toBeInTheDocument();
});

test('calls closePopup function when close icon is clicked', () => {
    const closePopupMock = jest.fn();
    render(<Popup closePopup={closePopupMock} setTitle={() => undefined} setDescription={() => undefined} />);
    const closeIconElement = screen.getByTestId('popupCloseIcon');
    fireEvent.click(closeIconElement);
    expect(closePopupMock).toHaveBeenCalled();
});

test('updates title state on input change', () => {
    const setTitleMock = jest.fn();
    render(<Popup closePopup={() => undefined} setTitle={setTitleMock} setDescription={() => undefined} />);
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(setTitleMock).toHaveBeenCalledWith('New Title');
});

test('updates description state on input change', () => {
    const setDescriptionMock = jest.fn();
    render(<Popup closePopup={() => undefined} setTitle={() => undefined} setDescription={setDescriptionMock} />);
    const descriptionInput = screen.getByPlaceholderText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    expect(setDescriptionMock).toHaveBeenCalledWith('New Description');
});
