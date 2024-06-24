import Task from "../Task/Task";
import React from "react";
import { useTasks } from "../../lib/tasks/useTasks";
import { TodolistDomainType } from "../Todolist/TodoList";

type Props = {
  todolist: TodolistDomainType;
};
export const Tasks = ({ todolist }: Props) => {
  const { filteredTasksForTodoList } = useTasks(todolist.id, todolist.filter);

  return (
    <ul>
      {filteredTasksForTodoList?.map((task) => {
        return <Task key={task.id} todoListId={todolist.id} task={task} />;
      })}
    </ul>
  );
};

export default Tasks;
