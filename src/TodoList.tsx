import React, {FC, useEffect} from "react";
import Task from "./Task";
import {AddItemForm} from "./AddItemForm";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {FilterValuesType} from "./types";
import {getTasksTC} from "./state/tasks-reducer";
import {useAppDispatch} from "./state/store";
import {useTodolist} from "./hooks/useTodolist";
import {useTasks} from "./hooks/useTasks";


type TodolistPropsType = {
    todolistId: string
    title: string,
    activeFilter: FilterValuesType,
}

const TodoList: FC<TodolistPropsType> = React.memo((
    {
        todolistId,
        title,
        activeFilter,
    }) => {
    const dispatch = useAppDispatch();
    const {
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        removeTodolist
    } = useTodolist(todolistId);

    const {
        filteredTasksForTodoList,
        addTaskHandler,
    } = useTasks(todolistId, activeFilter)

    useEffect(() => {
        dispatch(getTasksTC(todolistId));
    }, [todolistId, dispatch])

    return (
        <div className='todolist'>
            <div className='todolist'>
                <h3>
                    {title}
                    <IconButton aria-label="delete" onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <ul>
                    {filteredTasksForTodoList.map((task) => {
                        return <Task
                            key={task.id}
                            todoListId={todolistId}
                            task={task}
                        />
                    })}
                </ul>
                <div>
                    <Button
                        variant={activeFilter === 'all' ? "outlined" : "contained"}
                        onClick={onAllClickHandler}
                        color='success'>All</Button>
                    <Button
                        variant={activeFilter === 'active' ? "outlined" : "contained"}
                        onClick={onActiveClickHandler}
                        color='error'>Active</Button>
                    <Button
                        variant={activeFilter === 'completed' ? "outlined" : "contained"}
                        onClick={onCompletedClickHandler}
                        color='primary'>Completed</Button>
                </div>
            </div>
        </div>
    )
})

export default React.memo(TodoList);
