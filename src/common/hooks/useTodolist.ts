import { useCallback, useMemo } from "react";
import { todolistsActions } from "features/TodoListsList/todolist-reducer";
import { useActions } from "./useActions";

export const useTodolist = (todolistId: string) => {
  const { deleteTodolist, changeTodolistFilter, updateTodolistTitle } =
    useActions();

  const removeTodolist = useCallback(() => {
    deleteTodolist(todolistId);
  }, [todolistId]);

  const onAllClickHandler = useCallback(() => {
    changeTodolistFilter({ todolistId, filter: "all" });
  }, [todolistId]);

  const onActiveClickHandler = useCallback(() => {
    changeTodolistFilter({ todolistId, filter: "active" });
  }, [todolistId]);

  const onCompletedClickHandler = useCallback(() => {
    todolistsActions.changeTodolistFilter({
      todolistId,
      filter: "completed",
    });
  }, [todolistId]);

  const todolistTitleChangeHandler = useCallback((title: string) => {
    updateTodolistTitle({ todolistId, title });
  }, []);

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
