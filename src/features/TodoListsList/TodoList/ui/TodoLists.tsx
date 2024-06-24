import React, { useEffect } from "react";
import { fetchTodolists } from "features/TodoListsList/TodoList/model/todolist/todolistsSlice";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import TodoList from "./Todolist/TodoList";
import { isLoggedSelector } from "features/Login/model/isLoggedSelector";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../common/utils";
import { useTodolist } from "../lib/todolist/useTodolist";

type Props = {
  demo?: boolean;
};

export const TodolistsList = ({ demo = false }: Props) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedSelector);

  useEffect(() => {
    if (!isLoggedIn || demo) return;
    dispatch(fetchTodolists());
  }, [dispatch]);

  const { todoLists, addTodolistHandler } = useTodolist();

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <Grid container style={{ padding: "15px" }}>
        <AddItemForm addItem={addTodolistHandler} />
      </Grid>
      <Grid container spacing={3}>
        {todoLists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper elevation={5} style={{ padding: "15px" }}>
                <TodoList demo={demo} todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
