import {useAppDispatch} from "../../state/store";
import React, {useEffect} from "react";
import {getTodosTC} from "../../state/todolist-reducer";
import {useApp} from "../../hooks/useApp";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import TodoList from "./TodoList/TodoList";

export const TodolistsList = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTodosTC());
    }, [dispatch])

    const {todoLists, addTodolistHandler} = useApp();

    return <div>
        <Grid container style={{padding: '15px'}}>
            <AddItemForm addItem={addTodolistHandler}/>
        </Grid>
        <Grid container spacing={3}>
            {todoLists.map((tl) => {
                return <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding: '15px'}}>
                        <TodoList
                            todolistId={tl.id}
                            title={tl.title}
                            activeFilter={tl.filter}
                        />
                    </Paper>
                </Grid>
            })}
        </Grid>
    </div>

}
