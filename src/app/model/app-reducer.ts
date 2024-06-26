import { authActions } from "features/Login/model/auth-reducer";
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { authAPI } from "features/Login/api/loginApi";
import { ResultCode } from "common/enums";
import { todolistsThunks } from "../../features/TodoListsList/TodoList/model/todolist/todolistsSlice";
import { taskThunks } from "../../features/TodoListsList/TodoList/model/tasks/tasksSlice";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>,
    ) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state) => {
        state.isInitialized = true;
      })
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed";
        if (
          action.type === todolistsThunks.createTodolist.rejected.type ||
          taskThunks.createTask.rejected.type
        ) {
          return;
        }

        if (action.payload) {
          state.error = action.payload.messages[0];
        } else {
          state.error = action.error.message
            ? action.error.message
            : "Some error occurred";
        }
      });
  },
});

export const me = createAppAsyncThunk(
  `${slice.name}/me`,
  async (_, thunkAPI) => {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.success) {
      thunkAPI.dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    }
  },
);

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { me };
