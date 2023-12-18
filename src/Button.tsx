import {FC} from "react";

type PropsType = {
    title: string
    callBack: () => void
    isDisabled?: boolean
}

export const Button: FC<PropsType> = ({title, callBack, isDisabled}) => {
    const onClickHandler = () => {
        callBack();
    }
    return (
        <button onClick={onClickHandler} disabled={isDisabled}>
            {title}
        </button>
    )
}
