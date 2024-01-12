import {ChangeEvent, FC} from "react";
import {TaskType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";

type TaskComponentPropsType = {
    todoListId: string
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTaskTitle: string) => void
}

const Task: FC<TaskComponentPropsType> = ({task, todoListId, removeTask, changeStatus, changeTaskTitle}) => {
    const statusChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todoListId, task.id, evt.currentTarget.checked);
    }
    const titleChangeHandler = (newTitle: string) => {
        changeTaskTitle(todoListId, task.id, newTitle)
    }
    return (
        <li className={task.isDone ? 'is-done' : ''} key={task.id}>
            <input type="checkbox" checked={task.isDone} onChange={statusChangeHandler}/>
            <EditableSpan oldTitle={task.title} callback={titleChangeHandler} />
            <Button variant={"contained"} onClick={() => {
                removeTask(todoListId, task.id)
            }}>X</Button>
            {/*<button onClick={() => {*/}
            {/*    removeTask(todoListId, task.id)*/}
            {/*}}>Х*/}
            {/*</button>*/}
        </li>
    )
}

export default Task;
