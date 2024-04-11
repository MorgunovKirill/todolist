import React, {FC} from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar";
import Container from "@mui/material/Container";
import {TodolistsList} from "../features/TodoListsList/TodoLists";
import CustomizedSnackbars from "../components/SnackBar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";

type AppPropsType = {
    demo?: boolean
}

const App:FC<AppPropsType> = React.memo(({demo = false}) => {
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList demo={demo} />}></Route>
                    <Route path={"/login"} element={<Login />}></Route>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path="*" element={<Navigate to={"/404"} />} />
                </Routes>
            </Container>
            <CustomizedSnackbars/>
        </div>
    );
})

export default App;
