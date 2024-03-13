import {tasksSelector, todolistSelector} from "../state/selectors";
import {useCallback, useMemo} from "react";
import {FilterValuesType, TaskStatuses, TaskType} from "../types";
import {addTodolistAC, changeTodolistFilterAC, removeTodolistAC} from "../state/todolist-reducer";
import {createTaskTC} from "../state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../state/store";

export const useApp = (todolistId: string = '', activeFilter: FilterValuesType = 'all') => {
    const dispatch = useAppDispatch();
    const todoLists = useAppSelector(todolistSelector)
    const tasks = useAppSelector(tasksSelector)[todolistId];
    const addTodolistHandler = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action)
    }, [dispatch])

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
        dispatch(createTaskTC(todolistId, title))
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


    return useMemo(() => ({
        todoLists,
        addTodolistHandler,
        filteredTasksForTodoList,
        addTaskHandler,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        removeTodolist
    }), [
        todoLists,
        addTodolistHandler,
        filteredTasksForTodoList,
        addTaskHandler,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        removeTodolist])
}
