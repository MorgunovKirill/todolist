import {FC} from "react";
import {TaskType} from "./App";

const Task: FC<TaskType> = ({id, title, isDone}) => {
    return (
        <li key={id}>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            {/*<button onClick={() => {removeTask(id)}}>Х</button>*/}
        </li>
    )
}

export default Task;
