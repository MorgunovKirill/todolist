import { useCallback, useMemo } from "react"
import {
  changeTodolistFilterAC,
  deleteTodolistTC,
  updateTodolistTitleTC,
} from "state/todolist-reducer"
import { useAppDispatch } from "state/store"

export const useTodolist = (todolistId: string) => {
  const dispatch = useAppDispatch()

  const removeTodolist = useCallback(() => {
    dispatch(deleteTodolistTC(todolistId))
  }, [dispatch, todolistId])

  const onAllClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC({ todolistId, filter: "all" }))
  }, [dispatch, todolistId])

  const onActiveClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC({ todolistId, filter: "active" }))
  }, [dispatch, todolistId])

  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeTodolistFilterAC({ todolistId, filter: "completed" }))
  }, [dispatch, todolistId])

  const todolistTitleChangeHandler = useCallback(
    (newTitle: string) => {
      dispatch(updateTodolistTitleTC(todolistId, newTitle))
    },
    [dispatch],
  )

  return useMemo(
    () => ({
      onAllClickHandler,
      onActiveClickHandler,
      onCompletedClickHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    }),
    [
      onAllClickHandler,
      onActiveClickHandler,
      onCompletedClickHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    ],
  )
}
