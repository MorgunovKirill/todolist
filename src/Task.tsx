import {FC} from "react";
import {TaskType} from "./TodoList";

type TaskComponentPropsType = {
    task: TaskType,
    removeTask: (id: string) => void
}

const Task: FC<TaskComponentPropsType> = ({task, removeTask}) => {
    return (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => {removeTask(task.id)}}>Х</button>
        </li>
    )
}

export default Task;
