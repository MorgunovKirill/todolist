export type FilterValuesType = 'all' | 'active' | 'completed'

// export type TaskType = {
//     id: string,
//     title: string,
//     isDone: boolean,
// }
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type updateTaskType=  {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

// API types

export type FieldErrorType = {
    error: string
    field: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: T
}

export type GetTaskResponse = {
    error: string
    totalCount: number
    items: TaskType[]
}
