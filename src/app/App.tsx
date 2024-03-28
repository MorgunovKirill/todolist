import React, {FC} from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import Container from "@mui/material/Container";
import {TodolistsList} from "../features/TodoListsList/TodoLists";
import CustomizedSnackbars from "../components/SnackBar/ErrorSnackbar";

type AppPropsType = {
    demo?: boolean
}

const App:FC<AppPropsType> = React.memo(({demo = false}) => {
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList demo={demo} />
            </Container>
            <CustomizedSnackbars/>
        </div>
    );
})

export default App;
