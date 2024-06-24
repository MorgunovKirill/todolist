import Button from "@mui/material/Button";
import React from "react";
import { useTodolist } from "../../lib/todolist/useTodolist";
import { TodolistDomainType } from "../Todolist/TodoList";

type Props = {
  todolist: TodolistDomainType;
};
const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilterHandler } = useTodolist(todolist.id);

  return (
    <>
      <Button
        variant={todolist.filter === "all" ? "outlined" : "contained"}
        onClick={() => {
          changeTodolistFilterHandler("all");
        }}
        color="success"
      >
        All
      </Button>
      <Button
        variant={todolist.filter === "active" ? "outlined" : "contained"}
        onClick={() => {
          changeTodolistFilterHandler("active");
        }}
        color="error"
      >
        Active
      </Button>
      <Button
        variant={todolist.filter === "completed" ? "outlined" : "contained"}
        onClick={() => {
          changeTodolistFilterHandler("completed");
        }}
        color="primary"
      >
        Completed
      </Button>
    </>
  );
};

export default FilterTasksButtons;
