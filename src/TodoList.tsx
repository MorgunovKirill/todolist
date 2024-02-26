import React, {FC, useCallback, useMemo} from "react";
import Task from "./Task";
import {AddItemForm} from "./AddItemForm";
import {Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {FilterValuesType, TaskType} from "./types";
import {useDispatch, useSelector} from "react-redux";
import {tasksSelector} from "./state/selectors";
import {changeTodolistFilterAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC} from "./state/tasks-reducer";


type PropsType = {
    todolistId: string
    title: string,
    activeFilter: FilterValuesType,
}

const TodoList: FC<PropsType> = (
    {
        todolistId,
        title,
        activeFilter,
    }) => {
    const tasks = useSelector(tasksSelector)[todolistId];
    const dispatch = useDispatch();

    const filteredTasksForTodoList = useMemo(() => getFilteredTasks(tasks, activeFilter), [tasks, activeFilter]);

    function getFilteredTasks(tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> {
        let filteredTasks = tasks;
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.isDone)
        }
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.isDone)
        }
        return filteredTasks;
    }

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch, todolistId])

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch, todolistId])

    const onAllClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'all'))
    }, [dispatch, todolistId])

    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'active'))
    }, [dispatch, todolistId])

    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(todolistId, 'completed'))
    }, [dispatch, todolistId])


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
}

export default React.memo(TodoList);
