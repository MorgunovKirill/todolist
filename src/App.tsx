import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoListId3 = v1()

    const [tasksObj, setTasksObj] = useState({
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
    });

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'Products to buy', filter: 'all'},
        {id: todoListId3, title: 'Gifts to buy', filter: 'all'},
    ])

    function removeTask(todoListId: string, taskId: string) {
        setTasksObj({...tasksObj, [todoListId]: tasksObj[todoListId].filter(task => task.id !== taskId)});
    }

    function addTask(todoListId: string, newTitle: string) {
        const newTask: TaskType = {id: v1(), title: newTitle, isDone: false}
        setTasksObj({...tasksObj, [todoListId]: [newTask, ...tasksObj[todoListId]]});
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const newTodolists = todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: value} : tl);
        setTodoLists(newTodolists);
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasksObj({...tasksObj, [todoListId]: tasksObj[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)});
    }

    function removeTodolistById(todoListId: string) {
        const filteredTodolist = todoLists.filter(t => t.id !== todoListId);
        setTodoLists(filteredTodolist)
        delete tasksObj[todoListId]
        setTasksObj({...tasksObj})
    }

    return (
        <div className="App">
            {todoLists.map((tl) => {
                return <TodoList
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    activeFilter={tl.filter}
                    tasks={tasksObj[tl.id]}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    removeTodolistById={removeTodolistById}
                />
            })}
        </div>
    );
}

export default App;
