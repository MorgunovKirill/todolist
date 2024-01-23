import {ChangeEvent, FC} from "react";
import CheckboxMUI from "@mui/material/Checkbox";

type CheckboxProps = {
    checked: boolean
    callback: (checked: boolean) => void
}

export const Checkbox:FC<CheckboxProps> = ({checked, callback}) => {
    const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        callback(evt.currentTarget.checked);
    }
    return (
        <CheckboxMUI
            checked={checked}
            onChange={changeHandler}
        />
    )
}
