import { todolistAPI } from "features/TodoListsList/TodoList/api/todolist/todolistsApi";
import {
  appActions,
  RequestStatusType,
} from "../../../../../app/model/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { ResultCode } from "common/enums/enums";
import {
  FilterValuesType,
  TodolistDomainType,
} from "features/TodoListsList/TodoList/ui/Todolist/TodoList";
import { clearData } from "common/actions/common.actions";
import { thunkTryCatch } from "../../../../../common/utils/thunkTryCatch";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>,
    ) => {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId,
      );
      if (index > -1) {
        state[index].filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; status: RequestStatusType }>,
    ) => {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId,
      );
      if (index > -1) {
        state[index].entityStatus = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        });
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.payload.todolistId,
        );
        if (index > -1) {
          state.splice(index, 1);
        }
      })
      .addCase(updateTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.payload.todolistId,
        );
        if (index > -1) {
          state[index].title = action.payload.title;
        }
      })
      .addCase(clearData.type, () => {
        return [];
      });
  },
});

export const fetchTodolists = createAppAsyncThunk(
  `${slice.name}/fetchTodolists`,
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const todolists = await todolistAPI.getTodolists();
      thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolists };
    });
  },
);

export const createTodolist = createAppAsyncThunk(
  `${slice.name}/createTodolist`,
  async (title: string, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistAPI.createTodolist(title);
      if (res.data.resultCode === ResultCode.success) {
        return { todolist: res.data.data.item };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    });
  },
);

export const deleteTodolist = createAppAsyncThunk(
  `${slice.name}/deleteTodolist`,
  async (todolistId: string, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistAPI.deleteTodolist(todolistId);

      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { todolistId };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    });
  },
);

export const updateTodolistTitle = createAppAsyncThunk(
  `${slice.name}/updateTodolistTitle`,
  async (param: { todolistId: string; title: string }, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistAPI.updateTodolist(
        param.todolistId,
        param.title,
      );
      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return {
          todolistId: param.todolistId,
          title: param.title,
        };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    });
  },
);

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {
  fetchTodolists,
  createTodolist,
  deleteTodolist,
  updateTodolistTitle,
};
