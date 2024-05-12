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
import {
  _ErrorType,
  handleServerAppError,
  handleServerNetworkError,
} from "utils/handleErrorUtils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await todolistAPI.getTasks(todolistId)
      const tasks = res.data.items
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
      return { todolistId, tasks }
    } catch (e) {
      handleServerNetworkError(e as _ErrorType, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const removeTask = createAsyncThunk(
  "tasks/createTask",
  async (param: { todolistId: string; taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
    try {
      const res = await todolistAPI.deleteTask(param.todolistId, param.taskId)
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
        return { todolistId: param.todolistId, taskId: param.taskId }
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(err as _ErrorType, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  },
)

// export const createTask = createAsyncThunk(
//   "tasks/createTask",
//   ({ todolistId: string, title: string }, thunkAPI) => {},
// )

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
    createTaskAC: (state, action: PayloadAction<TaskType>) => {
      const tasks = state[action.payload.todoListId]
      tasks.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolistAC, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolistAC, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(setTodolistsAC, (state, action) => {
        action.payload.todolists.forEach((tl: any) => {
          state[tl.id] = []
        })
      })
      .addCase(clearDataAC, (state, action) => {})
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index > -1) {
          tasks.splice(index, 1)
        }
      })
  },
})

export const tasksReducer = slice.reducer
export const { updateTaskAC, createTaskAC } = slice.actions
