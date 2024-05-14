import React, { FC, useEffect } from "react";
import Task from "./Task/Task";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { TodolistDomainType } from "types";
import { useTodolist } from "hooks/useTodolist";
import { useTasks } from "hooks/useTasks";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { useAppDispatch } from "../../../state/store";
import { fetchTasks } from "../../../state/tasks-reducer";

type TodolistPropsType = {
  todolist: TodolistDomainType;
  demo?: boolean;
};

const TodoList: FC<TodolistPropsType> = React.memo(
  ({ todolist, demo = false }) => {
    const {
      onAllClickHandler,
      onActiveClickHandler,
      onCompletedClickHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    } = useTodolist(todolist.id);

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchTasks(todolist.id));
    }, [dispatch]);

    const { filteredTasksForTodoList, addTaskHandler } = useTasks(
      todolist.id,
      todolist.filter,
    );

    const isDisabled = todolist.entityStatus === "loading";

    return (
      <div className="todolist">
        <div className="todolist">
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
          <ul>
            {filteredTasksForTodoList?.map((task) => {
              return (
                <Task key={task.id} todoListId={todolist.id} task={task} />
              );
            })}
          </ul>
          <div>
            <Button
              variant={todolist.filter === "all" ? "outlined" : "contained"}
              onClick={onAllClickHandler}
              color="success"
            >
              All
            </Button>
            <Button
              variant={todolist.filter === "active" ? "outlined" : "contained"}
              onClick={onActiveClickHandler}
              color="error"
            >
              Active
            </Button>
            <Button
              variant={
                todolist.filter === "completed" ? "outlined" : "contained"
              }
              onClick={onCompletedClickHandler}
              color="primary"
            >
              Completed
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

export default React.memo(TodoList);
