import {ChangeEvent, FC} from "react";
import {TaskType} from "./TodoList";

type TaskComponentPropsType = {
    task: TaskType,
    removeTask: (id: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

const Task: FC<TaskComponentPropsType> = ({task, removeTask, changeStatus}) => {
    const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, evt.currentTarget.checked);
    }
    return (
        <li className={task.isDone ? 'is-done' : ''} key={task.id}>
            <input type="checkbox" checked={task.isDone} onChange={changeHandler}/>
            <span>{task.title}</span>
            <button onClick={() => {
                removeTask(task.id)
            }}>Х
            </button>
        </li>
    )
}

export default Task;
