import React, { FC, useEffect } from "react";
import Task from "../tasks/Task";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useTodolist } from "features/TodoListsList/TodoList/lib/todolist/useTodolist";
import { useTasks } from "features/TodoListsList/TodoList/lib/tasks/useTasks";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { RequestStatusType } from "app/model/app-reducer";
import { useActions } from "../../../../../common/hooks/useActions";

type TodolistPropsType = {
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

const TodoList: FC<TodolistPropsType> = React.memo(
  ({ todolist, demo = false }) => {
    const {
      onAllClickHandler,
      onActiveClickHandler,
      onCompletedClickHandler,
      removeTodolist,
      todolistTitleChangeHandler,
    } = useTodolist(todolist.id);

    const { fetchTasks } = useActions();

    useEffect(() => {
      fetchTasks(todolist.id);
    }, []);

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