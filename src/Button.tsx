import {FC} from "react";

type PropsType = {
    title: string
}

export const Button: FC<PropsType> = (props) => {
    return (
        <button>
            {props.title}
        </button>
    )
}
