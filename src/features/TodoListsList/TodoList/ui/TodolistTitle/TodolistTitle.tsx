import { EditableSpan } from "../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import React from "react";
import { useTodolist } from "../../lib/todolist/useTodolist";
import { TodolistDomainType } from "../Todolist/TodoList";
import { AddItemForm } from "../../../../../common/components";
import { useTasks } from "../../lib/tasks/useTasks";

type Props = {
  todolist: TodolistDomainType;
};
const TodolistTitle = ({ todolist }: Props) => {
  const { removeTodolist, todolistTitleChangeHandler } = useTodolist(
    todolist.id,
  );
  const { addTaskHandler } = useTasks(todolist.id, todolist.filter);
  const isDisabled = todolist.entityStatus === "loading";

  return (
    <>
      <h3>
        <EditableSpan
          oldTitle={todolist.title}
          callback={todolistTitleChangeHandler}
        />
        <IconButton
          aria-label="delete"
          onClick={removeTodolist}
          disabled={isDisabled}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} disabled={isDisabled} />
    </>
  );
};

export default TodolistTitle;
