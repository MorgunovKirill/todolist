import { useCallback, useMemo } from "react";
import {
  deleteTodolist,
  todolistsActions,
  updateTodolistTitle,
} from "features/TodoListsList/todolist-reducer";
import { useAppDispatch } from "../utils";

export const useTodolist = (todolistId: string) => {
  const dispatch = useAppDispatch();

  const removeTodolist = useCallback(() => {
    dispatch(deleteTodolist(todolistId));
  }, [dispatch, todolistId]);

  const onAllClickHandler = useCallback(() => {
    dispatch(
      todolistsActions.changeTodolistFilter({ todolistId, filter: "all" }),
    );
  }, [dispatch, todolistId]);

  const onActiveClickHandler = useCallback(() => {
    dispatch(
      todolistsActions.changeTodolistFilter({ todolistId, filter: "active" }),
    );
  }, [dispatch, todolistId]);

  const onCompletedClickHandler = useCallback(() => {
    dispatch(
      todolistsActions.changeTodolistFilter({
        todolistId,
        filter: "completed",
      }),
    );
  }, [dispatch, todolistId]);

  const todolistTitleChangeHandler = useCallback(
    (title: string) => {
      dispatch(updateTodolistTitle({ todolistId, title }));
    },
    [dispatch],
  );

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
  );
};
