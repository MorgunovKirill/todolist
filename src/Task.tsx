import React, {FC, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "./components/Checkbox";
import {TaskStatuses, TaskType} from "./types";
import {removeTaskTC, updateTaskStatusTC} from "./state/tasks-reducer";
import {useAppDispatch} from "./state/store";

type TaskComponentPropsType = {
    todoListId: string
    task: TaskType
}

const Task: FC<TaskComponentPropsType> = React.memo(({task, todoListId}) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskTC(todoListId, task.id))
    }, [dispatch, todoListId, task.id])

    const statusChangeHandler = useCallback((checked: boolean) => {
        dispatch(updateTaskStatusTC(todoListId, task.id, {status: checked ? TaskStatuses.Completed : TaskStatuses.New }))
    }, [dispatch, todoListId, task.id])

    const titleChangeHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskStatusTC(todoListId, task.id, {title: newTitle }))
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
