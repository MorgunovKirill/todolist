import { FilterValuesType, TodolistDomainType } from "types";
import { todolistAPI } from "api/api";
import { RequestStatusType, setAppStatusAC } from "./app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/handleErrorUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilterAC: (
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
    changeTodolistEntityStatusAC: (
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
    clearDataAC: (state, action: PayloadAction<{}>) => {
      return [];
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
      });
  },
});

export const todolistsReducer = slice.reducer;
export const {
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  clearDataAC,
} = slice.actions;

export const fetchTodolists = createAsyncThunk(
  `${slice.name}/fetchTodolists`,
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    try {
      const todolists = await todolistAPI.getTodolists();
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
      return { todolists };
      // todolists.forEach((todolist) => {
      //   thunkAPI.dispatch(fetchTasks(todolist.id));
      // });
    } catch (e) {
      handleServerNetworkError(e as Error, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const createTodolist = createAsyncThunk(
  `${slice.name}/createTodolist`,
  async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.createTodolist(title);
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return { todolist: res.data.data.item };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e as Error, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const deleteTodolist = createAsyncThunk(
  `${slice.name}/deleteTodolist`,
  async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    thunkAPI.dispatch(
      changeTodolistEntityStatusAC({ todolistId, status: "loading" }),
    );
    const res = await todolistAPI.deleteTodolist(todolistId);
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return { todolistId };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e as Error, thunkAPI.dispatch);
      thunkAPI.dispatch(
        changeTodolistEntityStatusAC({ todolistId, status: "idle" }),
      );
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const updateTodolistTitle = createAsyncThunk(
  `${slice.name}/updateTodolistTitle`,
  async (param: { todolistId: string; title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.updateTodolist(param.todolistId, param.title);
    try {
      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return {
          todolistId: param.todolistId,
          title: param.title,
        };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e as Error, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);
