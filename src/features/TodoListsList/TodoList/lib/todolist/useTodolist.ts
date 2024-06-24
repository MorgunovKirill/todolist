import { useMemo } from "react";
import { useActions } from "../../../../../common/hooks/useActions";
import { useAppSelector } from "../../../../../common/utils";
import { todolistSelector } from "../../model/todolist/todolist.selectors";
import { FilterValuesType } from "../../ui/Todolist/TodoList";

export const useTodolist = (todolistId: string = "") => {
  const {
    createTodolist,
    deleteTodolist,
    changeTodolistFilter,
    updateTodolistTitle,
  } = useActions();

  const todoLists = useAppSelector(todolistSelector);
  const addTodolistHandler = (title: string) => {
    return createTodolist(title);
  };

  const removeTodolist = () => {
    deleteTodolist(todolistId);
  };

  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ todolistId, filter });
  };

  const todolistTitleChangeHandler = (title: string) => {
    updateTodolistTitle({ todolistId, title });
  };

  return useMemo(
    () => ({
      todoLists,
      addTodolistHandler,
      changeTodolistFilterHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    }),
    [
      todoLists,
      addTodolistHandler,
      changeTodolistFilterHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    ],
  );
};
