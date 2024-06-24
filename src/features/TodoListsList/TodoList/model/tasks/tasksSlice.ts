import {
  createTodolist,
  deleteTodolist,
  fetchTodolists,
} from "../todolist/todolistsSlice";
import { appActions } from "../../../../../app/model/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { ResultCode, TaskPriorities } from "common/enums";
import { TodolistType } from "features/TodoListsList/TodoList/ui/Todolist/TodoList";
import { TaskType } from "features/TodoListsList/TodoList/ui/Task/Task";
import { clearData } from "common/actions/common.actions";
import { thunkTryCatch } from "../../../../../common/utils/thunkTryCatch";
import {
  CreateTaskArgs,
  RemoveTaskArgs,
  tasksAPI,
  UpdateTaskArgs,
} from "../../api/tasks/tasksApi";

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
      })
      .addCase(clearData.type, () => {
        return {};
      });
  },
});

export const fetchTasks = createAppAsyncThunk<
  { todolistId: string; tasks: TaskType[] },
  string
>(`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksAPI.getTasks(todolistId);
    const tasks = res.data.items;
    thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { todolistId, tasks };
  });
});

export const createTask = createAppAsyncThunk<TaskType, CreateTaskArgs>(
  `${slice.name}/createTask`,
  async (param, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksAPI.createTask(param);
      if (res.data.resultCode === ResultCode.success) {
        return res.data.data.item;
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch, false);
        return thunkAPI.rejectWithValue(res.data);
      }
    });
  },
);

export const removeTask = createAppAsyncThunk<RemoveTaskArgs, RemoveTaskArgs>(
  `${slice.name}/removeTask`,
  async (param, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksAPI.deleteTask(param);
      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { todolistId: param.todolistId, taskId: param.taskId };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    });
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

    const arg: UpdateTaskArgs = {
      todolistId: param.todolistId,
      taskId: param.taskId,
      domainModel: apiModel,
    };

    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksAPI.updateTask(arg);

      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return param;
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    });
  },
);

export const tasksSlice = slice.reducer;
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

export type TasksStateType = {
  [key: string]: TaskType[];
};
