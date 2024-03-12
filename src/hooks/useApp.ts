import {useSelector} from "react-redux";
import {tasksSelector, todolistSelector} from "../state/selectors";
import {useCallback, useEffect, useMemo} from "react";
import {FilterValuesType, TaskStatuses, TaskType} from "../types";
import {addTodolistAC, changeTodolistFilterAC, getTodosTC, removeTodolistAC} from "../state/todolist-reducer";
import {addTaskAC} from "../state/tasks-reducer";
import {useAppDispatch} from "../state/store";

export const useApp = (todolistId: string = '', activeFilter: FilterValuesType = 'all') => {
    const dispatch = useAppDispatch();
    const todoLists = useSelector(todolistSelector)
    const tasks = useSelector(tasksSelector)[todolistId];
    const addTodolistHandler = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action)
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodosTC());
    }, [])

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        let filteredTasks = tasks;
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
        }
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
        }
        return filteredTasks;
    }

    const filteredTasksForTodoList = useMemo(() => getFilteredTasks(tasks, activeFilter), [tasks, activeFilter]);

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

    return {
        todoLists,
        addTodolistHandler,
        filteredTasksForTodoList,
        addTaskHandler,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        removeTodolist
    }
}
