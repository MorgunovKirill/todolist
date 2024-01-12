import {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {
    const [title, setTitle] = useState<string>('');
    const [titleError, setTitleError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setTitleError(null);
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            setTitleError('')
            addItem(title);
            setTitle('')
        } else {
            setTitleError('Field required')
        }
    }

    return <div>
        <input
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            className={titleError ? 'error' : ''}
        />
        <Button title="+" callBack={addTaskHandler}/>
        {titleError && <div className='error-message'>{titleError}</div>}
    </div>
}
