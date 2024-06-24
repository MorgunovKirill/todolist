import React, { useEffect } from "react";
import { RequestStatusType } from "app/model/app-reducer";
import { useActions } from "../../../../../common/hooks/useActions";
import FilterTasksButtons from "../FilterTasksButtons/FilterTasksButtons";
import Tasks from "../Tasks/Tasks";
import TodolistTitle from "../TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  demo?: boolean;
};

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

const TodoList = ({ todolist }: Props) => {
  const { fetchTasks } = useActions();

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  );
};

export default TodoList;
