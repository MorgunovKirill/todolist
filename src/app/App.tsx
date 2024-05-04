import React, { FC, useEffect } from "react"
import "./App.css"
import ButtonAppBar from "../components/ButtonAppBar"
import Container from "@mui/material/Container"
import { TodolistsList } from "features/TodoListsList/TodoLists"
import CustomizedSnackbars from "../components/SnackBar/ErrorSnackbar"
import { Login } from "features/Login/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "state/store"
import CircularProgress from "@mui/material/CircularProgress"
import { isInitializedSelector } from "state/selectors/isInitializedSelector"
import { meTC } from "state/app-reducer"

type AppPropsType = {
  demo?: boolean
}

const App: FC<AppPropsType> = React.memo(({ demo = false }) => {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(isInitializedSelector)

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
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
  )
})

export default App
