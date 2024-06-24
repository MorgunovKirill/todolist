import { instance } from "common/instance";
import { TodolistType } from "features/TodoListsList/TodoList/ui/todolist/TodoList";
import { BaseResponseType } from "common/types";

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists").then((res) => {
      return res.data;
    });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>(
      "todo-lists",
      {
        title,
      },
    );
  },
  deleteTodolist(todoId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todoId}`);
  },
  updateTodolist(todoId: string, title: string) {
    return instance.put<BaseResponseType>(`todo-lists/${todoId}`, { title });
  },
};
