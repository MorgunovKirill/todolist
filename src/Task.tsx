import {ChangeEvent, FC} from "react";
import {TaskType} from "./TodoList";

type TaskComponentPropsType = {
    todoListId: string
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

const Task: FC<TaskComponentPropsType> = ({task, todoListId, removeTask, changeStatus}) => {
    const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, evt.currentTarget.checked, todoListId);
    }
    return (
        <li className={task.isDone ? 'is-done' : ''} key={task.id}>
            <input type="checkbox" checked={task.isDone} onChange={changeHandler}/>
            <span>{task.title}</span>
            <button onClick={() => {
                removeTask(task.id, todoListId)
            }}>Х
            </button>
        </li>
    )
}

export default Task;
