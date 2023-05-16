import React, { Dispatch, FC, useEffect, useRef, useState } from "react"
import './style.css'
import { ReactComponent as Trash } from '../../svg/trash.svg'
import { ReactComponent as Edit } from '../../svg/pen.svg'
import { ReactComponent as CheckMark } from '../../svg/checkmark.svg'
import { INotes } from "../../types/notes"
import { useAppDispatch } from "../../app/hooks"
import { editNote, removeNote } from "../../slices/notes"
import Input from "../Input/Input"


const Note: FC<INotes> = ({ description, title, id }) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editableTitle, seteEditableTitle] = useState(title);
    const [editableDescription, seteEditableDescription] = useState(description);
    const noteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            seteEditableTitle(title)
            seteEditableDescription(description);
        }
    }, [isOpen])

    const removeNoteHandler = () => {
        dispatch(removeNote(id));
        setIsOpen(false);
    }

    const openNoteHandler = () => {
        setIsOpen(true);

        if (noteRef.current) {
            const rect = noteRef.current.getBoundingClientRect();
            noteRef.current.style.position = 'absolute';
            noteRef.current.style.left = `${rect.left}px`;
            noteRef.current.style.top = `${rect.top}px`;
        }
    }

    const closeNoteHandler = () => {
        setIsOpen(false);
        clearNote();
    }

    const editNoteHandler = () => {
        setIsEdit(true)
    }

    const clearNote = () => {
        setIsEdit(false);
    }

    const editConfirmHandler = () => {
        dispatch(editNote({ description: editableDescription, title: editableTitle, id }));
        clearNote();
    }

    const editHandler = (value: string, setState: Dispatch<React.SetStateAction<string>>) => {
        setState(value);
    }

    return (
        <>
            <div className={`noteWrapper ${isOpen ? 'noteOpen' : null}`}>
                <div onClick={openNoteHandler} className={'noteBlock'}>
                    {!isEdit && <h2 className={'noteTitle'}>{title}</h2>}
                    {isEdit &&
                        <Input
                            style={{ marginBottom: '1rem', width: '100%' }}
                            onChange={(e) => editHandler(e.target.value, seteEditableTitle)}
                            value={editableTitle} type="text"
                        />}
                    {!isEdit && <p className={'noteDescription'}>{description}</p>}
                    {isEdit &&
                        <textarea
                            onChange={(e) => editHandler(e.target.value, seteEditableDescription)}
                            className={'noteEditDescription'}
                            value={editableDescription}
                        />}
                </div>
                <div className={'notePanelWrapper'}>
                    <div className={'notePanel'}>
                        {!isEdit && <div
                            className={`${'noteTrash'} ${'noteIcon'}`}
                            onClick={removeNoteHandler}>
                            <Trash />
                        </div>}
                        {!isEdit && isOpen && <div
                            className={'noteEdit noteIcon'}
                            onClick={editNoteHandler}>
                            <Edit />
                        </div>}
                        {isEdit && isOpen &&
                            <div
                                className={`noteEditConfirm noteIcon`}
                                onClick={editConfirmHandler}>
                                <CheckMark />
                            </div>
                        }
                    </div>
                </div>

            </div >
            {isOpen && <div onClick={closeNoteHandler} className={'noteOverlay'}></div>}
        </>
    )
}

export default Note
