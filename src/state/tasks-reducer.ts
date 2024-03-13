import {AddTodolistACType, RemoveTodolistACType, SetTodoListsACType,} from "./todolist-reducer";
import {
    TaskPriorities,
    TasksStateType,
    TaskType,
    UpdateDomainTaskModelType,
    UpdateTaskModelType
} from "../types";
import {api} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const SET_TODOLISTS_ACTION = 'SET-TODOLISTS';
const UPDATE_TASK_ACTION = 'UPDATE_TASK';
const REMOVE_TASK_ACTION = 'REMOVE-TASK';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';
const SET_TASK_ACTION = 'SET-TASK';
const SET_TASKS_ACTION = 'SET-TASKS';

type tasksReducerActionType =
    | ChangeStatusACType
    | RemoveTaskACType
    | RemoveTodolistACType
    | AddTodolistACType
    | SetTodoListsACType
    | SetTasksType
    | SetTaskType

const initialState = {}

export const tasksReducer = (state: TasksStateType = initialState, {
    type,
    payload
}: tasksReducerActionType): TasksStateType => {
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
            return {
                [payload.newTodolistId]: [],
                ...state
            }
        default:
            return state
    }
}

type ChangeStatusACType = ReturnType<typeof updateTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>
type SetTaskType = ReturnType<typeof setTaskAC>

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

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        api.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}

export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        api.createTask(todolistId, title).then((res) => {
            dispatch(setTaskAC(res.data.data.item))
        })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        api.deleteTask(todolistId, taskId).then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
    }
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

        api.updateTask(todolistId, taskId, apiModel).then((res) => {
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
        })
    }
}
