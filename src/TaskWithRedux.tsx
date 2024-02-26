import React, {FC, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "./components/Checkbox";
import {TaskType} from "./types";

type TaskWithReduxComponentPropsType = {
    todoListId: string
    task: TaskType
}

const TaskWithRedux: FC<TaskWithReduxComponentPropsType> = React.memo(({task, todoListId}) => {
    // const statusChangeHandler = useCallback((checked: boolean) => {
    //     changeStatus(todoListId, task.id, checked);
    // }, [changeStatus, todoListId, task.id])
    //
    // const titleChangeHandler = useCallback((newTitle: string) => {
    //     changeTaskTitle(todoListId, task.id, newTitle)
    // }, [changeTaskTitle, todoListId, task.id])

    return (
        <li className={task.isDone ? 'is-done' : ''} key={task.id}>
            {/*<Checkbox checked={task.isDone} callback={statusChangeHandler} />*/}
            {/*<EditableSpan oldTitle={task.title} callback={titleChangeHandler}/>*/}
            {/*<IconButton aria-label="delete" onClick={() => {*/}
            {/*    removeTask(todoListId, task.id)*/}
            {/*}}>*/}
            {/*    <Delete/>*/}
            {/*</IconButton>*/}
        </li>
    )
})

export default TaskWithRedux;
