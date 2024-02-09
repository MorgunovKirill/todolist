import React from 'react';
import './App.css';
import TodoList from "./TodoList";
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
} from "./state/tasks-reducer";
import {addTodolistAC, removeTodolistAC, changeTodolistFilterAC, todolistsReducer} from "./state/todolist-reducer";
import {FilterValuesType, TasksStateType, TodolistType} from "./types";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./index";

function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, TodolistType[]>( state => state.todolists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    function removeTask(todoListId: string, taskId: string) {
        dispatch(removeTaskAC(todoListId, taskId))
    }

    function addTask(todoListId: string, newTitle: string) {
        dispatch(addTaskAC(todoListId, newTitle))
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatch(changeStatusAC(todoListId, taskId, isDone))
    }

    function changeTaskTitle(todoListId: string, taskId: string, title: string) {
        dispatch(changeTaskTitleAC(todoListId, taskId, title))
    }

    function removeTodolistById(todoListId: string) {
        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }

    function addTodolistHandler(title: string) {
        const action = addTodolistAC(title);
        dispatch(action)
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
