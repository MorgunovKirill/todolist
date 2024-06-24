import { useCallback, useMemo } from "react";
import { TaskStatuses } from "common/enums";
import { FilterValuesType } from "features/TodoListsList/TodoList/TodoList";
import { TaskType } from "features/TodoListsList/TodoList/Task/Task";
import { useAppSelector } from "../utils";
import { tasksSelector } from "../../features/TodoListsList/tasks.selectors";
import { useActions } from "./useActions";

export const useTasks = (
  todolistId: string,
  activeFilter: FilterValuesType = "all",
) => {
  const { createTask } = useActions();
  const tasks = useAppSelector(tasksSelector)[todolistId];
  const getFilteredTasks = (
    tasks: Array<TaskType>,
    filter: FilterValuesType,
  ): Array<TaskType> => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter(
        (task) => task.status === TaskStatuses.Completed,
      );
    }
    if (filter === "active") {
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.New);
    }
    return filteredTasks;
  };

  const filteredTasksForTodoList = useMemo(
    () => getFilteredTasks(tasks, activeFilter),
    [tasks, activeFilter],
  );

  const addTaskHandler = useCallback(
    (title: string) => {
      createTask({ todolistId, title });
    },
    [todolistId],
  );

  return useMemo(
    () => ({
      filteredTasksForTodoList,
      addTaskHandler,
    }),
    [filteredTasksForTodoList, addTaskHandler],
  );
};
