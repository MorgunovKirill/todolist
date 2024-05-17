import axios, { AxiosResponse } from "axios";
import { TaskType, TodolistType } from "types";
import { LoginType } from "features/Login/Login";
import { UpdateDomainTaskModelType } from "../state/tasks-reducer";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "97103ee0-8697-48f6-acf9-551ee6a7a329",
  },
});

export const authAPI = {
  me() {
    return instance.get<ResponseType<UserDataType>>("auth/me");
  },
  login(data: LoginTypeRequestType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      LoginTypeRequestType
    >(`auth/login`, data);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
};

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists").then((res) => {
      return res.data;
    });
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title,
    });
  },
  deleteTodolist(todoId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}`);
  },
  updateTodolist(todoId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoId}`, { title });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(param: CreateTaskArgs) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${param.todolistId}/tasks`,
      { title: param.title },
    );
  },
  deleteTask(param: RemoveTaskArgs) {
    return instance.delete<ResponseType>(
      `/todo-lists/${param.todolistId}/tasks/${param.taskId}`,
    );
  },
  updateTask(param: UpdateTaskArgs) {
    const { todolistId, taskId, domainModel } = param;
    return instance.put<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      domainModel,
    );
  },
};

// API types

export type FieldErrorType = {
  error: string;
  field: string;
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldErrorType[];
  data: T;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

type UserDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginTypeRequestType = LoginType & {
  captcha?: boolean;
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
