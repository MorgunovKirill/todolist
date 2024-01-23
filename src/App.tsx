import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTodolistAC,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoListId3 = v1()

    // const [tasksObj, setTasksObj] = useState<TasksStateType>({
    //     [todoListId1]: [
    //         {id: v1(), title: 'HTML', isDone: true},
    //         {id: v1(), title: 'CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: false},
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: 'beer', isDone: true},
    //         {id: v1(), title: 'fish', isDone: true},
    //         {id: v1(), title: 'bread', isDone: false},
    //         {id: v1(), title: 'cheeps', isDone: false},
    //         {id: v1(), title: 'cheese', isDone: false},
    //     ],
    //     [todoListId3]: [
    //         {id: v1(), title: 'bar', isDone: true},
    //         {id: v1(), title: 'chess', isDone: true},
    //         {id: v1(), title: 'books', isDone: false},
    //     ]
    // });

    const [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
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
        dispatchTasksObj(removeTaskAC(todoListId, taskId))
    }

    function addTask(todoListId: string, newTitle: string) {
        const newTask: TaskType = {id: v1(), title: newTitle, isDone: false}
        dispatchTasksObj(addTaskAC(todoListId, newTask))
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const newTodolists = todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: value} : tl)
        setTodoLists(newTodolists)
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatchTasksObj(changeStatusAC(todoListId, taskId, isDone))
    }

    function changeTaskTitle(todoListId: string, taskId: string, title: string) {
        dispatchTasksObj(changeTaskTitleAC(todoListId, taskId, title))
    }

    function removeTodolistById(todoListId: string) {
        const filteredTodolist = todoLists.filter(t => t.id !== todoListId);
        setTodoLists(filteredTodolist)
        dispatchTasksObj(removeTodolistAC(todoListId))
    }

    function addTodolistHandler(title: string) {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        // setTasksObj({...tasksObj, [newTodolistId]: []})
        setTodoLists([newTodolist, ...todoLists])
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding:'15px'}}>
                    <AddItemForm addItem={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        return <Grid item>
                            <Paper elevation={5} style={{padding: '15px'}}>
                                <TodoList
                                    key={tl.id}
                                    todolistId={tl.id}
                                    title={tl.title}
                                    activeFilter={tl.filter}
                                    tasks={tasksObj[tl.id]}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    removeTodolistById={removeTodolistById}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
