import {v1} from "uuid";
import {
    AddTodolistACType,
    RemoveTodolistACType,
    SetTodoListsACType,
} from "./todolist-reducer";
import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../types";
import {api} from "../api/api";
import {Dispatch} from "redux";

const SET_TODOLISTS_ACTION = 'SET-TODOLISTS';
const ADD_TASK_ACTION = 'ADD-TASK';
const CHANGE_STATUS_ACTION = 'CHANGE-STATUS';
const CHANGE_TASK_TITLE_ACTION = 'CHANGE_TASK_TITLE';
const REMOVE_TASK_ACTION = 'REMOVE-TASK';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';
const SET_TASK_ACTION = 'SET-TASK';
const SET_TASKS_ACTION = 'SET-TASKS';

type tasksReducerActionType =
    AddTaskACType
    | ChangeStatusACType
    | RemoveTaskACType
    | ChangeTaskTitleType
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
        case ADD_TASK_ACTION:
            const newTask: TaskType = {
                id: v1(),
                title: payload.newTitle,
                description: '',
                status: TaskStatuses.New,
                todoListId: payload.todoListId,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
            return {
                ...state,
                [payload.todoListId]: [newTask, ...state[payload.todoListId]]
            }
        case CHANGE_STATUS_ACTION:
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].map((t) => {
                    if (t.id === payload.taskId) {
                        return {...t, status: payload.status}
                    }
                    return t
                })
            }
        case REMOVE_TASK_ACTION:
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].filter(task => task.id !== payload.taskId)
            }
        case CHANGE_TASK_TITLE_ACTION:
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].map((t) => {
                    if (t.id === payload.taskId) {
                        return {...t, title: payload.title}
                    }
                    return t
                })
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

type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type SetTasksType = ReturnType<typeof setTasksAC>
type SetTaskType = ReturnType<typeof setTaskAC>

export const addTaskAC = (todoListId: string, newTitle: string) => {
    return {
        type: ADD_TASK_ACTION,
        payload: {
            todoListId,
            newTitle
        }
    } as const
}

export const changeStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: CHANGE_STATUS_ACTION,
        payload: {
            todoListId,
            taskId,
            status
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

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {
        type: CHANGE_TASK_TITLE_ACTION,
        payload: {
            todoListId,
            taskId,
            title
        }
    } as const
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: SET_TASKS_ACTION, payload: {todolistId, tasks} } as const
}

export const setTaskAC = (task: TaskType) => {
    return {type: SET_TASK_ACTION, payload: {task} } as const
}

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        api.getTasks(todolistId).then((res) => {
            console.log(todolistId, res.data.items)
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}
