import { useCallback, useMemo } from "react";
import { useAppSelector } from "../utils";
import { todolistSelector } from "../../features/TodoListsList/todolist.selectors";
import { useActions } from "./useActions";

export const useApp = () => {
  const { createTodolist } = useActions();
  const todoLists = useAppSelector(todolistSelector);
  const addTodolistHandler = useCallback((title: string) => {
    createTodolist(title);
  }, []);

  return useMemo(
    () => ({
      todoLists,
      addTodolistHandler,
    }),
    [todoLists, addTodolistHandler],
  );
};
