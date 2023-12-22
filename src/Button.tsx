import {FC} from "react";

type PropsType = {
    title: string
    callBack: () => void
    className?: string
    isDisabled?: boolean
}

export const Button: FC<PropsType> = ({className, title, callBack, isDisabled}) => {
    const onClickHandler = () => {
        callBack();
    }
    return (
        <button className={className} onClick={onClickHandler} disabled={isDisabled}>
            {title}
        </button>
    )
}
