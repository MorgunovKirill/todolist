import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
    const todoListTitle_1 = 'First';
    const todoListTitle_2 = 'Second';
    const todoListTitle_3 = 'Third';

    const tasks_1: TaskType[] = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: 'beer', isDone: true},
        {id: 2, title: 'fish', isDone: true},
        {id: 3, title: 'bread', isDone: false},
        {id: 4, title: 'cheeps', isDone: false},
        {id: 5, title: 'cheese', isDone: false},
    ]

    const tasks_3: TaskType[] = [
        {id: 1, title: 'bar', isDone: true},
        {id: 2, title: 'chess', isDone: true},
        {id: 3, title: 'books', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1} />
            <TodoList title={todoListTitle_2} tasks={tasks_2}  />
            <TodoList title={todoListTitle_3} tasks={tasks_3}  />
        </div>
    );
}

export default App;
