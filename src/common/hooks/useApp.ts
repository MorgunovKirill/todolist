import { useCallback, useMemo } from "react";
import { createTodolist } from "../../features/TodoListsList/todolist-reducer";
import { useAppDispatch, useAppSelector } from "../utils";
import { todolistSelector } from "../../features/TodoListsList/todolist.selectors";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector(todolistSelector);
  const addTodolistHandler = useCallback(
    (title: string) => {
      dispatch(createTodolist(title));
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      todoLists,
      addTodolistHandler,
    }),
    [todoLists, addTodolistHandler],
  );
};
