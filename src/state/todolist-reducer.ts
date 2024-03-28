import {v1} from "uuid";
import {FilterValuesType, TodolistDomainType, TodolistType} from "../types";
import {api} from "../api/api";
import {AppThunk} from "./store";

const SET_TODOLISTS_ACTION = 'SET-TODOLISTS';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE_ACTION = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER_ACTION = 'CHANGE-TODOLIST-FILTER';

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, {
    type,
    payload
}: TodolistsReducerActionsType): TodolistDomainType[] => {
    switch (type) {
        case SET_TODOLISTS_ACTION: {
            return payload.todolists.map(((tl) => ({...tl, filter: 'all'})))
        }
        case REMOVE_TODOLIST_ACTION: {
            return state.filter(el => el.id !== payload.todoListId)
        }
        case ADD_TODOLIST_ACTION: {
            const newTodolist: TodolistDomainType = {
                id: payload.newTodolistId,
                title: payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            };
            return [newTodolist, ...state]
        }
        case CHANGE_TODOLIST_TITLE_ACTION: {
            return state.map(el => el.id === payload.id ? {...el, title: payload.title} : el)
        }
        case CHANGE_TODOLIST_FILTER_ACTION: {
            return state.map(el => el.id === payload.todolistId ? {...el, filter: payload.filter} : el)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todoListId: string) => ({
    type: REMOVE_TODOLIST_ACTION,
    payload: {todoListId}
} as const)
export const addTodolistAC = (title: string) => {
    const newTodolistId = v1()
    return {
        type: ADD_TODOLIST_ACTION,
        payload: {newTodolistId, title}
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: CHANGE_TODOLIST_TITLE_ACTION,
    payload: {id, title}
} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: CHANGE_TODOLIST_FILTER_ACTION,
    payload: {todolistId, filter}
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: SET_TODOLISTS_ACTION,
    payload: {todolists}
} as const)

// THUNKS

// export const getTodosTC = (): AppThunk => {
//     return (dispatch) => {
//         api.getTodolists().then((res) => {
//             dispatch(setTodolistsAC(res.data))
//         })
//     }
// }

export const getTodosTC = (): AppThunk =>  async (dispatch) => {
    try {
        const res = await api.getTodolists()
        dispatch(setTodolistsAC(res.data))
    } catch (e) {
        throw new Error()
    }
}

export const createTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        api.createTodolist(title).then(() => {
            dispatch(addTodolistAC(title))
        })
    }
}

export const deleteTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        api.deleteTodolist(todolistId).then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        api.updateTodolist(todolistId, title).then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
    }
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodoListsACType = ReturnType<typeof setTodolistsAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export type TodolistsReducerActionsType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodoListsACType
