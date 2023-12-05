import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1 = 'First';
    const todoListTitle_2 = 'Second';
    const todoListTitle_3 = 'Third';

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const [tasks_1, setTasks_1] = useState<TaskType[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: false},
    ])

    function removeTask(id: number) {
        const filteredTasks = tasks_1.filter(task => task.id !== id);
        setTasks_1(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks_1;
    if(filter === 'completed') {
        tasksForTodoList = tasks_1.filter(task => task.isDone)
    }
    if(filter === 'active') {
        tasksForTodoList = tasks_1.filter(task => !task.isDone)
    }

    // let tasks_2: Array<TaskType> = [
    //     {id: 1, title: 'beer', isDone: true},
    //     {id: 2, title: 'fish', isDone: true},
    //     {id: 3, title: 'bread', isDone: false},
    //     {id: 4, title: 'cheeps', isDone: false},
    //     {id: 5, title: 'cheese', isDone: false},
    // ]
    //
    // let tasks_3: TaskType[] = [
    //     {id: 1, title: 'bar', isDone: true},
    //     {id: 2, title: 'chess', isDone: true},
    //     {id: 3, title: 'books', isDone: false},
    // ]

    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<TodoList title={todoListTitle_2} tasks={tasks_2} removeTask={removeTask} />*/}
            {/*<TodoList title={todoListTitle_3} tasks={tasks_3} removeTask={removeTask} />*/}
        </div>
    );
}

export default App;
