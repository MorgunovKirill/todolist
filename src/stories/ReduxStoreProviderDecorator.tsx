import React from 'react'
import {AppRootStateType} from "../state/store";
import {Provider} from "react-redux";
import {todolistsReducer} from "../state/todolist-reducer";
import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../types";

export const todoListId1 = v1()
export const todoListId2 = v1()

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
    {id: todoListId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
    {id: todoListId2, title: 'Products to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
    ],
    tasks: {
        [todoListId1]: [
            {id: v1(), title: 'HTML', status: TaskStatuses.Completed,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'CSS', status: TaskStatuses.Completed,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.New,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        [todoListId2]: [
            {id: v1(), title: 'beer', status: TaskStatuses.Completed,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'fish', status: TaskStatuses.Completed,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'bread', status: TaskStatuses.New,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'cheeps', status: TaskStatuses.New,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'cheese', status: TaskStatuses.New,
                todoListId: todoListId1, description: '', startDate: '', deadline: '',
                addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
    },
    app: {
        status: 'idle',
        error: null,
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType & undefined)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
