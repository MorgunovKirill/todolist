import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, todoListId1, todoListId2, todoListId3} from "./todolist-reducer";
import {TaskPriorities, TasksStateType, TaskStatuses, TaskType} from "../types";

const ADD_TASK_ACTION = 'ADD-TASK';
const CHANGE_STATUS_ACTION = 'CHANGE-STATUS';
const CHANGE_TASK_TITLE_ACTION = 'CHANGE_TASK_TITLE';
const REMOVE_TASK_ACTION = 'REMOVE-TASK';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';

type tasksReducerActionType =
    AddTaskACType
    | ChangeStatusACType
    | RemoveTaskACType
    | ChangeTaskTitleType
    | RemoveTodolistACType
    | AddTodolistACType

const initialState: TasksStateType = {
    [todoListId1]: [
        {
            id: v1(),
            title: 'HTML',
            description: '',
            status: TaskStatuses.Completed,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order:
                0,
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'CSS',
            description: '',
            status: TaskStatuses.Completed,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'JS',
            description: '',
            status: TaskStatuses.New,
            todoListId: todoListId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
    ],
    [todoListId2]: [
        {
            id: v1(),
            title: 'beer',
            description: '',
            status: TaskStatuses.Completed,
            todoListId: todoListId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'fish',
            description: '',
            status: TaskStatuses.Completed,
            todoListId: todoListId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'bread',
            description: '',
            status: TaskStatuses.New,
            todoListId: todoListId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
    ],
    [todoListId3]: [
        {
            id: v1(),
            title: 'bar',
            description: '',
            status: TaskStatuses.Completed,
            todoListId: todoListId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: v1(), title: 'chess',
            description: '',
            status: TaskStatuses.Completed,
            todoListId: todoListId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: v1(),
            title: 'books',
            description: '',
            status: TaskStatuses.New,
            todoListId: todoListId3,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
    ]
}


export const tasksReducer = (state: TasksStateType = initialState, {
    type,
    payload
}: tasksReducerActionType): TasksStateType => {
    switch (type) {
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
