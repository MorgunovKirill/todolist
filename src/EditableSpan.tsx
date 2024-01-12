import {ChangeEvent, FC, useState} from "react";

type EditableSpanPropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({oldTitle, callback}) => {
    const [newTitle, setNewTitle] = useState(oldTitle)
    const [editMode, setEditMode] = useState(false)

    const editModeChangeHandler = () => {
        setNewTitle(oldTitle)
        setEditMode(!editMode)
        if(editMode) {
            callback(newTitle)
        }
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return  editMode
        ?  <input value={newTitle} onChange={changeHandler} onBlur={editModeChangeHandler} autoFocus />
        :  <span onDoubleClick={editModeChangeHandler}>{oldTitle}</span>
}
