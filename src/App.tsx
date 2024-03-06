import React from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TodoList from "./TodoList";
import {useApp} from "./hooks/useApp";

const App = React.memo(() => {
    const {todoLists, addTodolistHandler} = useApp();

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
                                <TodoList
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
    );
})


export default App;
