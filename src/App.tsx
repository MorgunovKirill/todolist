import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle_1 = 'First';
    // const todoListTitle_2 = 'Second';
    // const todoListTitle_3 = 'Third';

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const [tasks_1, setTasks_1] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
    ])

    // const tasks_2: Array<TaskType> = [
    //     {id: v1(), title: 'beer', isDone: true},
    //     {id: v1(), title: 'fish', isDone: true},
    //     {id: v1(), title: 'bread', isDone: false},
    //     {id: v1(), title: 'cheeps', isDone: false},
    //     {id: v1(), title: 'cheese', isDone: false},
    // ]
    //
    // const tasks_3: TaskType[] = [
    //     {id: v1(), title: 'bar', isDone: true},
    //     {id: v1(), title: 'chess', isDone: true},
    //     {id: v1(), title: 'books', isDone: false},
    // ]

    function removeTask(id: string) {
        const filteredTasks: TaskType[] = tasks_1.filter(task => task.id !== id);
        setTasks_1(filteredTasks);
    }

    function addTask(newTitle: string) {
        const newTask: TaskType = { id: v1(), title: newTitle, isDone: false}
        const newTasks: TaskType[] = [newTask, ...tasks_1];
        setTasks_1(newTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function getFilteredTasks(tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> {
        let filteredTasks = tasks;
        if(filter === 'completed') {
            filteredTasks = tasks_1.filter(task => task.isDone)
        }
        if(filter === 'active') {
            filteredTasks = tasks_1.filter(task => !task.isDone)
        }
        return filteredTasks;
    }

    const tasksForTodoList = getFilteredTasks(tasks_1, filter);
    // const tasksForTodoList2 = getFilteredTasks(tasks_2, filter);
    // const tasksForTodoList3 = getFilteredTasks(tasks_3, filter);


    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={tasksForTodoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<TodoList title={todoListTitle_2} tasks={tasks_2} removeTask={removeTask} />*/}
            {/*<TodoList title={todoListTitle_3} tasks={tasks_3} removeTask={removeTask} />*/}
        </div>
    );
}

export default App;
