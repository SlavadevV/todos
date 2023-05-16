import { ChangeEvent, Dispatch, FC } from 'react';
import './style.css'
import Button from '../Button/Button';
import React from 'react'
import Input from '../Input/Input';

interface IPopupProps {
    closePopup: () => any;
    onSubmit?: () => any;
    setTitle: Dispatch<React.SetStateAction<string>>;
    setDescription: Dispatch<React.SetStateAction<string>>
}

const Popup: FC<IPopupProps> = ({
    closePopup,
    onSubmit,
    setTitle,
    setDescription
}) => {

    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const descriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    return (
        <div data-testid={"popup"} className={'popup'}>
            <div className={'popupInner'}>
                <span onClick={closePopup} data-testid={"popupCloseIcon"} className={'popupCloseIcon'}></span>
                <h1>Create a new note</h1>
                <Input onChange={titleHandler} placeholder="Title" />
                <Input onChange={descriptionHandler} placeholder="Description" />
                <Button onClick={onSubmit} text='Create' />
            </div>
        </div>
    );
}

export default Popup;
