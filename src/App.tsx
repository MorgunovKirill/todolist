import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {addTodolistAC} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {todolistSelector} from "./state/selectors";
import TodoListWithRedux from "./TodoListWithRedux";

const App = React.memo(() => {
    console.log('App rendered')
    const dispatch = useDispatch();
    const todoLists = useSelector(todolistSelector)

    const addTodolistHandler = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodolistHandler}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl) => {
                        return <Grid item key={tl.id}>
                            <Paper elevation={5} style={{padding: '15px'}}>
                                <TodoListWithRedux
                                    todolistId={tl.id}
                                    title={tl.title}
                                    activeFilter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
        ;
})


export default App;
