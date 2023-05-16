import React, { FC } from 'react';
import './style.css';

interface IButtonProps {
    onClick?: () => any;
    text: string;
}

const Button: FC<IButtonProps> = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className={'button'}>
            {text}
        </button>
    );
}

export default Button;
