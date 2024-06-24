import { UpdateDomainTaskModelType } from "features/TodoListsList/TodoList/model/tasks/tasksSlice";
import { instance } from "common/instance";
import { TaskType } from "features/TodoListsList/TodoList/ui/Task/Task";
import { BaseResponseType } from "common/types";

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(param: CreateTaskArgs) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(
      `/todo-lists/${param.todolistId}/tasks`,
      { title: param.title },
    );
  },
  deleteTask(param: RemoveTaskArgs) {
    return instance.delete<BaseResponseType>(
      `/todo-lists/${param.todolistId}/tasks/${param.taskId}`,
    );
  },
  updateTask(param: UpdateTaskArgs) {
    const { todolistId, taskId, domainModel } = param;
    return instance.put<BaseResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      domainModel,
    );
  },
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type CreateTaskArgs = {
  todolistId: string;
  title: string;
};

export type RemoveTaskArgs = {
  todolistId: string;
  taskId: string;
};

export type UpdateTaskArgs = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};
