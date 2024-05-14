import {
  clearDataAC,
  createTodolist,
  deleteTodolist,
  fetchTodolists,
} from "./todolist-reducer";
import {
  TaskPriorities,
  TasksStateType,
  TodolistType,
  UpdateDomainTaskModelType,
  UpdateTaskModelType,
} from "types";
import { todolistAPI } from "api/api";
import { AppRootStateType } from "./store";
import { setAppStatusAC } from "./app-reducer";
import {
  _ErrorType,
  handleServerAppError,
  handleServerNetworkError,
} from "utils/handleErrorUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      .addCase(clearDataAC, () => {})
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
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }
      });
  },
});

export const fetchTasks = createAsyncThunk(
  `${slice.name}/fetchTasks`,
  async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistAPI.getTasks(todolistId);
      const tasks = res.data.items;
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
      return { todolistId, tasks };
    } catch (e) {
      handleServerNetworkError(e as _ErrorType, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const removeTask = createAsyncThunk(
  `${slice.name}/removeTask`,
  async (param: { todolistId: string; taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistAPI.deleteTask(param.todolistId, param.taskId);
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return { todolistId: param.todolistId, taskId: param.taskId };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err as _ErrorType, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const createTask = createAsyncThunk(
  `${slice.name}/createTask`,
  async (param: { todolistId: string; title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.createTask(param.todolistId, param.title);
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return res.data.data.item;
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err as _ErrorType, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const updateTask = createAsyncThunk(
  `${slice.name}/updateTask`,
  async (
    param: {
      todolistId: string;
      taskId: string;
      domainModel: UpdateDomainTaskModelType;
    },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as AppRootStateType;

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

    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.updateTask(
      param.todolistId,
      param.taskId,
      apiModel,
    );
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return {
          todolistId: param.todolistId,
          taskId: param.taskId,
          model: param.domainModel,
        };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err as _ErrorType, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const tasksReducer = slice.reducer;
