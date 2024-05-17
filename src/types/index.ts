import { RequestStatusType } from "state/app-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4,
}

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

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type BaseAction<T extends (...args: any) => any> = Omit<
  ReturnType<T>,
  "meta"
>;
