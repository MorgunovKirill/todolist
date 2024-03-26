import {todolistSelector} from "../state/selectors";
import {useCallback, useMemo} from "react";
import {createTodolistTC} from "../state/todolist-reducer";
import {useAppDispatch, useAppSelector} from "../state/store";

export const useApp = () => {
    const dispatch = useAppDispatch();
    const todoLists = useAppSelector(todolistSelector)
    const addTodolistHandler = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


    return useMemo(() => ({
        todoLists,
        addTodolistHandler,
    }), [
        todoLists,
        addTodolistHandler,])
}
