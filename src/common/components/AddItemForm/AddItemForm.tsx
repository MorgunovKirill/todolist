import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { TaskType } from "../../../features/TodoListsList/TodoList/ui/Task/Task";
import { TodolistType } from "../../../features/TodoListsList/TodoList/ui/Todolist/TodoList";
import { BaseResponseType } from "../../types";

type AddItemFormPropsType = {
  addItem: (title: string) => {
    unwrap: () => Promise<TaskType | { todolist: TodolistType }>;
  };
  disabled?: boolean;
};

export const AddItemForm: FC<AddItemFormPropsType> = ({
  addItem,
  disabled = false,
}) => {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);

  const inputTextChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (titleError) setTitleError(null);
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  const addTaskHandler = () => {
    if (title.trim() !== "") {
      setTitleError("");
      addItem(title)
        .unwrap()
        .then((res) => {
          setTitle("");
        })
        .catch((err: BaseResponseType) => {
          if (err?.resultCode) {
            setTitleError(err.messages[0]);
          }
        });
    } else {
      setTitleError("Field required");
    }
  };

  const style = {
    width: "38px",
    height: "38px",
    maxWidth: "38px",
  };

  return (
    <div>
      <TextField
        error={!!titleError}
        helperText={titleError}
        value={title}
        onChange={inputTextChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={titleError ? "error" : ""}
        id="outlined-basic"
        label={titleError ? "Title" : "Type something"}
        variant="outlined"
        size="small"
        disabled={disabled}
      />
      <Button
        disabled={disabled}
        style={style}
        variant={"contained"}
        onClick={addTaskHandler}
      >
        +
      </Button>
    </div>
  );
};
