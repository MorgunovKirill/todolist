import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType, todoListId1, todoListId2, todoListId3} from "./todolist-reducer";
import {TasksStateType, TaskType} from "../types";

const ADD_TASK_ACTION = 'ADD-TASK';
const CHANGE_STATUS_ACTION = 'CHANGE-STATUS';
const CHANGE_TASK_TITLE_ACTION = 'CHANGE_TASK_TITLE';
const REMOVE_TASK_ACTION = 'REMOVE-TASK';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';

type tasksReducerActionType = AddTaskACType | ChangeStatusACType | RemoveTaskACType | ChangeTaskTitleType | RemoveTodolistACType | AddTodolistACType

const initialState: TasksStateType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: 'beer', isDone: true},
        {id: v1(), title: 'fish', isDone: true},
        {id: v1(), title: 'bread', isDone: false},
        {id: v1(), title: 'cheeps', isDone: false},
        {id: v1(), title: 'cheese', isDone: false},
    ],
    [todoListId3]: [
        {id: v1(), title: 'bar', isDone: true},
        {id: v1(), title: 'chess', isDone: true},
        {id: v1(), title: 'books', isDone: false},
    ]
}


export const tasksReducer = (state: TasksStateType = initialState, {type, payload}: tasksReducerActionType): TasksStateType => {
    switch (type) {
        case ADD_TASK_ACTION:
            const newTask: TaskType = {id: v1(), title: payload.newTitle, isDone: false}
            return {
                ...state,
                [payload.todoListId]: [newTask, ...state[payload.todoListId]]
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
