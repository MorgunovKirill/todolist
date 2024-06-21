import React, { FC, useCallback } from "react";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { Checkbox } from "common/components/Checkbox";
import { removeTask, updateTask } from "features/TodoListsList/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "common/enums";
import { useAppDispatch } from "../../../../common/utils";

type TaskComponentPropsType = {
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

const Task: FC<TaskComponentPropsType> = React.memo(({ task, todoListId }) => {
  const dispatch = useAppDispatch();

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTask({ todolistId: todoListId, taskId: task.id }));
  }, [dispatch, todoListId, task.id]);

  const statusChangeHandler = useCallback(
    (checked: boolean) => {
      dispatch(
        updateTask({
          todolistId: todoListId,
          taskId: task.id,
          domainModel: {
            status: checked ? TaskStatuses.Completed : TaskStatuses.New,
          },
        }),
      );
    },
    [dispatch, todoListId, task.id],
  );

  const titleChangeHandler = useCallback(
    (newTitle: string) => {
      dispatch(
        updateTask({
          todolistId: todoListId,
          taskId: task.id,
          domainModel: { title: newTitle },
        }),
      );
    },
    [dispatch, todoListId, task.id],
  );

  return (
    <li
      className={task.status === TaskStatuses.Completed ? "is-done" : ""}
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
});

export default Task;
