import { FilterValuesType, TodolistDomainType, TodolistType } from "types"
import { todolistAPI } from "api/api"
import { AppThunk } from "./store"
import { RequestStatusType, setAppStatusAC } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/handleErrorUtils"
import { getTasksTC } from "./tasks-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolistAC: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.push({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    changeTodolistTitleAC: (
      state,
      action: PayloadAction<{ todolistId: string; title: string }>,
    ) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index > -1) {
        state[index].title = action.payload.title
      }
    },
    changeTodolistFilterAC: (
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>,
    ) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index > -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatusAC: (
      state,
      action: PayloadAction<{ todolistId: string; status: RequestStatusType }>,
    ) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index > -1) {
        state[index].entityStatus = action.payload.status
      }
    },
    setTodolistsAC: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }))
    },
    clearDataAC: (state, action: PayloadAction<{}>) => {
      return []
    },
  },
})

export const todolistsReducer = slice.reducer
export const {
  removeTodolistAC,
  addTodolistAC,
  setTodolistsAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  changeTodolistEntityStatusAC,
  clearDataAC,
} = slice.actions

export const getTodosTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const todolists = await todolistAPI.getTodolists()
    dispatch(setTodolistsAC({ todolists }))
    dispatch(setAppStatusAC({ status: "succeeded" }))
    todolists.forEach((todolist) => {
      dispatch(getTasksTC(todolist.id))
    })
  } catch (e) {
    handleServerNetworkError(e as Error, dispatch)
  }
}

export const createTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todolistAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTodolistAC({ todolist: res.data.data.item }))
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

export const deleteTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    dispatch(changeTodolistEntityStatusAC({ todolistId, status: "loading" }))
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolistAC({ todolistId }))
          dispatch(setAppStatusAC({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeTodolistEntityStatusAC({ todolistId, status: "idle" }))
      })
  }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTodolistTitleAC({ todolistId, title }))
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

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsACType = ReturnType<typeof setTodolistsAC>
export type ClearDataACType = ReturnType<typeof clearDataAC>
