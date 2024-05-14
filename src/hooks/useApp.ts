import { todolistSelector } from "../state/selectors";
import { useCallback, useMemo } from "react";
import { createTodolist } from "../state/todolist-reducer";
import { useAppDispatch, useAppSelector } from "../state/store";

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
