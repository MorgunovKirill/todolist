import {TasksStateType, TaskType} from "../App";

const ADD_TASK_ACTION = 'ADD-TASK';
const CHANGE_STATUS_ACTION = 'CHANGE-STATUS';
const CHANGE_TASK_TITLE_ACTION = 'CHANGE_TASK_TITLE';
const REMOVE_TASK_ACTION = 'REMOVE-TASK';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';

type tasksReducerActionType = AddTaskACType | ChangeStatusACType | RemoveTaskACType | ChangeTaskTitleType | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, {type, payload}: tasksReducerActionType): TasksStateType => {
    switch (type) {
        case ADD_TASK_ACTION:
            return {
                ...state,
                [payload.todoListId]: [payload.newTask, ...state[payload.todoListId]]
            }
        case CHANGE_STATUS_ACTION:
            return {
                ...state,
                [payload.todoListId]: state[payload.todoListId].map((t) => {
                    if (t.id === payload.taskId) {
                        return {...t, isDone: payload.isDone}
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
            debugger
            delete state[payload.todoListId]
            return {
                ...state,
            }
        default:
            return state
    }
}

type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const addTaskAC = (todoListId: string, newTask: TaskType) => {
    return {
        type: ADD_TASK_ACTION,
        payload: {
            todoListId,
            newTask
        }
    } as const
}

export const changeStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGE_STATUS_ACTION,
        payload: {
            todoListId,
            taskId,
            isDone
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

export const removeTodolistAC = (todoListId: string) => {
    return {
        type: REMOVE_TODOLIST_ACTION,
        payload: {
            todoListId
        }
    } as const
}
