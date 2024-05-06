import {
  addTodolistAC,
  clearDataAC,
  removeTodolistAC,
  setTodolistsAC,
} from "./todolist-reducer"
import {
  TaskPriorities,
  TasksStateType,
  TaskType,
  UpdateDomainTaskModelType,
  UpdateTaskModelType,
} from "types"
import { todolistAPI } from "api/api"
import { AppRootStateType, AppThunk } from "./store"
import { setAppStatusAC } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/handleErrorUtils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    updateTaskAC: (
      state,
      action: PayloadAction<{
        todolistId: string
        taskId: string
        model: UpdateDomainTaskModelType
      }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    removeTaskAC: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    setTasksAC: (
      state,
      action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>,
    ) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
    createTaskAC: (state, action: PayloadAction<TaskType>) => {
      const tasks = state[action.payload.todoListId]
      tasks.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId]
    })
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
    builder.addCase(clearDataAC, (state, action) => {})
  },
})

export const tasksReducer = slice.reducer
export const { updateTaskAC, setTasksAC, createTaskAC, removeTaskAC } = slice.actions

export const getTasksTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todolistAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC({ todolistId, tasks: res.data.items }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
      })
  }
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todolistAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(createTaskAC(res.data.data.item))
          dispatch(setAppStatusAC({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
      })
  }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todolistAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTaskAC({ todolistId, taskId }))
          dispatch(setAppStatusAC({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
      })
  }
}

export const updateTaskTC = (
  todolistId: string,
  taskId: string,
  domainModel: UpdateDomainTaskModelType,
): AppThunk => {
  return (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)

    if (!task) {
      console.warn("Task not found in the state")
      return
    }

    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      priority: TaskPriorities.Low,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    }

    dispatch(setAppStatusAC({ status: "loading" }))
    todolistAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(updateTaskAC({ todolistId, taskId, model: domainModel }))
          dispatch(setAppStatusAC({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
      })
  }
}
