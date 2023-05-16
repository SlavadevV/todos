import { FC } from "react"
import './style.css'
import React from 'react'

const Input: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...rest }) => {

    return (
        <input {...rest} className={`input ${rest.className}`} />
    )
}

export default Input
