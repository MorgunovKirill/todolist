import axios, { AxiosResponse } from "axios";
import { TodolistType, TaskType } from "types";
import { LoginType } from "features/Login/Login";
import {
  UpdateDomainTaskModelType,
  UpdateTaskModelType,
} from "../state/tasks-reducer";

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
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model,
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

export type GetTaskResponse = {
  error: string;
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

export type UpdateTaskArgs = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};
