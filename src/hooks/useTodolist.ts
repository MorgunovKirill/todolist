import {useCallback, useMemo} from "react";
import {changeTodolistFilterAC, deleteTodolistTC} from "../state/todolist-reducer";
import {useAppDispatch} from "../state/store";

export const useTodolist = (todolistId: string) => {
    const dispatch = useAppDispatch();

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodolistTC(todolistId))
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
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        removeTodolist
    }), [
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        removeTodolist])
}
