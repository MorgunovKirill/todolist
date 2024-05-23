import { tasksSelector } from "state/selectors"
import { useCallback, useMemo } from "react"
import { FilterValuesType, TaskStatuses, TaskType } from "common/types"
import {createTask} from "state/tasks-reducer"
import { useAppDispatch, useAppSelector } from "state/store"

export const useTasks = (todolistId: string, activeFilter: FilterValuesType = "all") => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(tasksSelector)[todolistId]
  const getFilteredTasks = (
    tasks: Array<TaskType>,
    filter: FilterValuesType,
  ): Array<TaskType> => {
    let filteredTasks = tasks
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    if (filter === "active") {
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.New)
    }
    return filteredTasks
  }

  const filteredTasksForTodoList = useMemo(
    () => getFilteredTasks(tasks, activeFilter),
    [tasks, activeFilter],
  )

  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(createTask({todolistId, title}))
    },
    [dispatch, todolistId],
  )

  return useMemo(
    () => ({
      filteredTasksForTodoList,
      addTaskHandler,
    }),
    [filteredTasksForTodoList, addTaskHandler],
  )
}
