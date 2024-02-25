import React from 'react'
import {AppRootStateType, store} from "../state/store";
import {Provider} from "react-redux";
import {todoListId1, todoListId2, todolistsReducer} from "../state/todolist-reducer";
import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'Products to buy', filter: 'all'},
    ],
    tasks: {
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
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType & undefined)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
