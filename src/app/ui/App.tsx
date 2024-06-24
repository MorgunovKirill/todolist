import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { TodolistsList } from "features/TodoListsList/TodoList/ui/TodoLists";
import { Login } from "features/Login/ui/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ButtonAppBar, CustomizedSnackbars } from "common/components";
import { isInitializedSelector } from "../model/app.selectors";
import { useAppSelector } from "../../common/utils";
import { useActions } from "../../common/hooks/useActions";

type Props = {
  demo?: boolean;
};

const App = ({ demo = false }: Props) => {
  const isInitialized = useAppSelector(isInitializedSelector);
  const { me } = useActions();

  useEffect(() => {
    me();
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistsList demo={demo} />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
      <CustomizedSnackbars />
    </div>
  );
};

export default App;
