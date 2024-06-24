import React from "react";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { Checkbox } from "common/components/Checkbox";
import { TaskPriorities, TaskStatuses } from "common/enums";
import { useActions } from "../../../../../common/hooks/useActions";
import s from "./Task.module.css";

type Props = {
  todoListId: string;
  task: TaskType;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

const Task = ({ task, todoListId }: Props) => {
  const { removeTask, updateTask } = useActions();
  const removeTaskHandler = () => {
    removeTask({ todolistId: todoListId, taskId: task.id });
  };

  const statusChangeHandler = (checked: boolean) => {
    updateTask({
      todolistId: todoListId,
      taskId: task.id,
      domainModel: {
        status: checked ? TaskStatuses.Completed : TaskStatuses.New,
      },
    });
  };

  const titleChangeHandler = (newTitle: string) => {
    updateTask({
      todolistId: todoListId,
      taskId: task.id,
      domainModel: { title: newTitle },
    });
  };

  return (
    <li
      className={task.status === TaskStatuses.Completed ? s.isDone : ""}
      key={task.id}
    >
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        callback={statusChangeHandler}
      />
      <EditableSpan oldTitle={task.title} callback={titleChangeHandler} />
      <IconButton aria-label="delete" onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </li>
  );
};

export default Task;
