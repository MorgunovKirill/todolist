import React, {FC, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "./components/Checkbox";
import {TaskStatuses, TaskType} from "./types";
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type TaskComponentPropsType = {
    todoListId: string
    task: TaskType
}

const Task: FC<TaskComponentPropsType> = React.memo(({task, todoListId}) => {
    const dispatch = useDispatch();

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(todoListId, task.id))
    }, [dispatch, todoListId, task.id])

    const statusChangeHandler = useCallback((checked: boolean) => {
        dispatch(changeStatusAC(todoListId, task.id, checked ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, todoListId, task.id])

    const titleChangeHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, task.id, newTitle))
    }, [dispatch, todoListId, task.id])

    return (
        <li className={task.status === TaskStatuses.Completed ? 'is-done' : ''} key={task.id}>
            <Checkbox checked={task.status === TaskStatuses.Completed} callback={statusChangeHandler} />
            <EditableSpan oldTitle={task.title} callback={titleChangeHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})

export default Task;
