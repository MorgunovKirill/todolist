import { useCallback, useMemo } from "react";
import { useActions } from "../../../../../common/hooks/useActions";
import { useAppSelector } from "../../../../../common/utils";
import { todolistSelector } from "../../model/todolist/todolist.selectors";

export const useTodolist = (todolistId: string = "") => {
  const {
    createTodolist,
    deleteTodolist,
    changeTodolistFilter,
    updateTodolistTitle,
  } = useActions();

  const todoLists = useAppSelector(todolistSelector);
  const addTodolistHandler = useCallback((title: string) => {
    createTodolist(title);
  }, []);

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
    changeTodolistFilter({
      todolistId,
      filter: "completed",
    });
  }, [todolistId]);

  const todolistTitleChangeHandler = useCallback((title: string) => {
    updateTodolistTitle({ todolistId, title });
  }, []);

  return useMemo(
    () => ({
      todoLists,
      addTodolistHandler,
      onAllClickHandler,
      onActiveClickHandler,
      onCompletedClickHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    }),
    [
      todoLists,
      addTodolistHandler,
      onAllClickHandler,
      onActiveClickHandler,
      onCompletedClickHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    ],
  );
};
