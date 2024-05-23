import { useAppDispatch, useAppSelector } from "state/store";
import React, { FC, useEffect } from "react";
import { fetchTodolists } from "state/todolist-reducer";
import { useApp } from "common/hooks/useApp";
import Grid from "@mui/material/Grid";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import TodoList from "./TodoList/TodoList";
import { isLoggedSelector } from "state/selectors/isLoggedSelector";
import { Navigate } from "react-router-dom";

type TodolistsListPropsType = {
  demo?: boolean;
};

export const TodolistsList: FC<TodolistsListPropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedSelector);

  useEffect(() => {
    if (!isLoggedIn || demo) return;
    dispatch(fetchTodolists());
  }, [dispatch]);

  const { todoLists, addTodolistHandler } = useApp();

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
