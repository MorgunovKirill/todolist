import { FilterValuesType, TodolistDomainType, TodolistType } from "types"
import { todolistAPI } from "api/api"
import { AppThunk } from "./store"
import { RequestStatusType, setAppStatusAC } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/handleErrorUtils"
import { getTasksTC } from "./tasks-reducer"

const SET_TODOLISTS_ACTION = "SET-TODOLISTS"
const REMOVE_TODOLIST_ACTION = "REMOVE-TODOLIST"
const ADD_TODOLIST_ACTION = "ADD-TODOLIST"
const CHANGE_TODOLIST_TITLE_ACTION = "CHANGE-TODOLIST-TITLE"
const CHANGE_TODOLIST_FILTER_ACTION = "CHANGE-TODOLIST-FILTER"
const CHANGE_TODOLIST_ENTITY_STATUS_ACTION = "CHANGE-TODOLIST_ENTITY-STATUS-ACTION"
export const CLEAR_DATA_ACTION = "CLEAR-DATA-ACTION"

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  { type, payload }: TodolistsReducerActionsType,
): TodolistDomainType[] => {
  switch (type) {
    case SET_TODOLISTS_ACTION: {
      return payload.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }))
    }
    case REMOVE_TODOLIST_ACTION: {
      return state.filter((el) => el.id !== payload.todoListId)
    }
    case ADD_TODOLIST_ACTION: {
      return [{ ...payload.todolist, filter: "all", entityStatus: "idle" }, ...state]
    }
    case CHANGE_TODOLIST_TITLE_ACTION: {
      return state.map((el) =>
        el.id === payload.id ? { ...el, title: payload.title } : el,
      )
    }
    case CHANGE_TODOLIST_FILTER_ACTION: {
      return state.map((el) =>
        el.id === payload.todolistId ? { ...el, filter: payload.filter } : el,
      )
    }
    case CHANGE_TODOLIST_ENTITY_STATUS_ACTION: {
      return state.map((el) =>
        el.id === payload.todolistId ? { ...el, entityStatus: payload.status } : el,
      )
    }
    case CLEAR_DATA_ACTION: {
      return []
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todoListId: string) =>
  ({
    type: REMOVE_TODOLIST_ACTION,
    payload: { todoListId },
  }) as const
export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: ADD_TODOLIST_ACTION,
    payload: { todolist },
  } as const
}
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: CHANGE_TODOLIST_TITLE_ACTION,
    payload: { id, title },
  }) as const
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) =>
  ({
    type: CHANGE_TODOLIST_FILTER_ACTION,
    payload: { todolistId, filter },
  }) as const
export const changeTodolistEntityStatusAC = (
  todolistId: string,
  status: RequestStatusType,
) =>
  ({
    type: CHANGE_TODOLIST_ENTITY_STATUS_ACTION,
    payload: { todolistId, status },
  }) as const
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({
    type: SET_TODOLISTS_ACTION,
    payload: { todolists },
  }) as const

export const clearDataAC = () =>
  ({
    type: CLEAR_DATA_ACTION,
    payload: {},
  }) as const

export const getTodosTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const todolists = await todolistAPI.getTodolists()
    dispatch(setTodolistsAC(todolists))
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
          dispatch(addTodolistAC(res.data.data.item))
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
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolistAC(todolistId))
          dispatch(setAppStatusAC({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(changeTodolistEntityStatusAC(todolistId, "idle"))
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
          dispatch(changeTodolistTitleAC(todolistId, title))
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
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistsReducerActionsType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistFilterACType
  | SetTodoListsACType
  | ChangeTodolistEntityStatusACType
  | ClearDataACType
