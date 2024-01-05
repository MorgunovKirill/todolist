import {ChangeEvent, FC} from "react";
import {TaskType} from "./TodoList";

type TaskComponentPropsType = {
    todoListId: string
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
}

const Task: FC<TaskComponentPropsType> = ({task, todoListId, removeTask, changeStatus}) => {
    const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todoListId, task.id, evt.currentTarget.checked);
    }
    return (
        <li className={task.isDone ? 'is-done' : ''} key={task.id}>
            <input type="checkbox" checked={task.isDone} onChange={changeHandler}/>
            <span>{task.title}</span>
            <button onClick={() => {
                removeTask(todoListId, task.id)
            }}>Х
            </button>
        </li>
    )
}

export default Task;
