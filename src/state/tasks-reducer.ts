import {
  createTodolist,
  deleteTodolist,
  fetchTodolists,
  todolistsActions,
} from "./todolist-reducer";
import { TaskPriorities, TasksStateType, TaskType, TodolistType } from "types";
import {
  CreateTaskArgs,
  RemoveTaskArgs,
  todolistAPI,
  UpdateTaskArgs,
} from "api/api";
import { appActions } from "./app-reducer";
import { handleServerNetworkError } from "utils/handleServerNetworkError";
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../utils/createAppAsyncThunk";
import { handleServerAppError } from "../utils/handleServerAppError";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl: TodolistType) => {
          state[tl.id] = [];
        });
      })
      .addCase(todolistsActions.clearData, () => {})
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId];
        tasks.unshift(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(
          (task) => task.id === action.payload.taskId,
        );
        if (index > -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      });
  },
});

export const fetchTasks = createAppAsyncThunk<
  { todolistId: string; tasks: TaskType[] },
  string
>(`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
  thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await todolistAPI.getTasks(todolistId);
    const tasks = res.data.items;
    thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { todolistId, tasks };
  } catch (e) {
    handleServerNetworkError(e, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue(null);
  }
});

export const createTask = createAppAsyncThunk<TaskType, CreateTaskArgs>(
  `${slice.name}/createTask`,
  async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistAPI.createTask(param.todolistId, param.title);
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return res.data.data.item;
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const removeTask = createAppAsyncThunk<RemoveTaskArgs, RemoveTaskArgs>(
  `${slice.name}/removeTask`,
  async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await todolistAPI.deleteTask(param.todolistId, param.taskId);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { todolistId: param.todolistId, taskId: param.taskId };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (param, thunkAPI) => {
    const state = thunkAPI.getState();

    const task = state.tasks[param.todolistId].find(
      (t) => t.id === param.taskId,
    );

    if (!task) {
      console.warn("Task not found in the state");
      return thunkAPI.rejectWithValue(null);
    }

    const apiModel: UpdateTaskModelType = {
      description: task.description,
      title: task.title,
      priority: TaskPriorities.Low,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...param.domainModel,
    };

    thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistAPI.updateTask(
      param.todolistId,
      param.taskId,
      apiModel,
    );
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return param;
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const tasksReducer = slice.reducer;
export const taskThunks = { fetchTasks, createTask, removeTask, updateTask };

export type UpdateTaskModelType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type UpdateDomainTaskModelType = {
  description?: string;
  title?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string;
};
