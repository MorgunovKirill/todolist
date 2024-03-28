import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import Container from "@mui/material/Container";
import {TodolistsList} from "../features/TodoListsList/TodoLists";
import CustomizedSnackbars from "../components/SnackBar/ErrorSnackbar";

const App = React.memo(() => {
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList />
            </Container>
            <CustomizedSnackbars/>
        </div>
    );
})

export default App;
