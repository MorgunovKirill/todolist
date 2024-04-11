import {AddTodolistACType, RemoveTodolistACType, SetTodoListsACType,} from "./todolist-reducer";
import {TaskPriorities, TasksStateType, TaskType, UpdateDomainTaskModelType, UpdateTaskModelType} from "../types";
import {todolistAPI} from "../api/api";
import {AppRootStateType, AppThunk} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/handleErrorUtils";

const SET_TODOLISTS_ACTION = 'SET-TODOLISTS';
const UPDATE_TASK_ACTION = 'UPDATE_TASK';
const REMOVE_TASK_ACTION = 'REMOVE-TASK';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';
const SET_TASK_ACTION = 'SET-TASK';
const SET_TASKS_ACTION = 'SET-TASKS';

const initialState = {}

export const tasksReducer = (state: TasksStateType = initialState, {
    type,
    payload
}: TasksReducerActionType): TasksStateType => {
    switch (type) {
        case SET_TASK_ACTION: {
            return {
                ...state,
                [payload.task.todoListId]: [payload.task, ...state[payload.task.todoListId]]
            };
        }
        case SET_TASKS_ACTION: {
            return {
                ...state,
                [payload.todolistId]: payload.tasks
            };
        }
        case SET_TODOLISTS_ACTION: {
            const copyState = {...state}

            payload.todolists.forEach((tl) => {
                copyState[tl.id] = [];
            })

            return copyState;
        }
        case UPDATE_TASK_ACTION:
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].map((t) => {
                    if (t.id === payload.taskId) {
                        return {...t, ...payload.model}
                    }
                    return t
                })
            }
        case REMOVE_TASK_ACTION:
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].filter(task => task.id !== payload.taskId)
            }
        case REMOVE_TODOLIST_ACTION:
            delete state[payload.todoListId]
            return {
                ...state,
            }
        case ADD_TODOLIST_ACTION:
            return {...state, [payload.todolist.id]: []}
        default:
            return state
    }
}

export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: UPDATE_TASK_ACTION,
        payload: {
            todoListId,
            taskId,
            model
        }
    } as const
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: REMOVE_TASK_ACTION,
        payload: {
            todoListId,
            taskId
        }
    } as const
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: SET_TASKS_ACTION, payload: {todolistId, tasks}} as const
}

export const setTaskAC = (task: TaskType) => {
    return {type: SET_TASK_ACTION, payload: {task}} as const
}

// THUNKS

export const getTasksTC = (todolistId: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'));
        }).catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
    }
}

export const createTaskTC = (todolistId: string, title: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.createTask(todolistId, title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.deleteTask(todolistId, taskId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType):AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);

        if(!task) {
            console.warn('Task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            priority: TaskPriorities.Low,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        dispatch(setAppStatusAC('loading'));
        todolistAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
    }
}

type ChangeStatusACType = ReturnType<typeof updateTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>
type SetTaskType = ReturnType<typeof setTaskAC>

export type TasksReducerActionType =
    | ChangeStatusACType
    | RemoveTaskACType
    | RemoveTodolistACType
    | AddTodolistACType
    | SetTodoListsACType
    | SetTasksType
    | SetTaskType
