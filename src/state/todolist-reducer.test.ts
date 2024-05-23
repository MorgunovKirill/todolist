import {
  todolistsActions,
  todolistsReducer,
  todolistsThunks,
} from "./todolist-reducer";
import { v1 } from "uuid";
import { BaseAction } from "common/types";
import { RequestStatusType } from "./app-reducer";
import {
  FilterValuesType,
  TodolistDomainType,
} from "features/TodoListsList/TodoList/TodoList";

let startState: Array<TodolistDomainType>;
let todoListId1: string;
let todoListId2: string;

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();
  startState = [
    {
      id: todoListId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ];
});

test("correct todolist should be removed", () => {
  type Action = BaseAction<typeof todolistsThunks.deleteTodolist.fulfilled>;

  const action: Action = {
    type: todolistsThunks.deleteTodolist.fulfilled.type,
    payload: { todolistId: todoListId1 },
  };

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  const newTodolist = {
    id: "1",
    addedDate: "",
    order: 0,
    title: "New Todolist",
  };

  type Action = BaseAction<typeof todolistsThunks.createTodolist.fulfilled>;

  const action: Action = {
    type: todolistsThunks.createTodolist.fulfilled.type,
    payload: { todolist: newTodolist },
  };

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New Todolist");
});

test("correct todolist should change its name", () => {
  const newTodolistTitle = "New Todolist";
  const payload = { todolistId: todoListId2, title: newTodolistTitle };

  type Action = BaseAction<
    typeof todolistsThunks.updateTodolistTitle.fulfilled
  >;

  const action: Action = {
    type: todolistsThunks.updateTodolistTitle.fulfilled.type,
    payload,
  };

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";
  const endState = todolistsReducer(
    startState,
    todolistsActions.changeTodolistFilter({
      todolistId: todoListId2,
      filter: newFilter,
    }),
  );
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("todolists should be set to the state", () => {
  const payload = {
    todolists: [
      { id: todoListId1, title: "What to learn", addedDate: "", order: 0 },
      { id: todoListId2, title: "What to buy", addedDate: "", order: 0 },
    ],
  };
  type Action = BaseAction<typeof todolistsThunks.fetchTodolists.fulfilled>;

  const action: Action = {
    type: todolistsThunks.fetchTodolists.fulfilled.type,
    payload,
  };

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});

test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatusType = "loading";
  const endState = todolistsReducer(
    startState,
    todolistsActions.changeTodolistEntityStatus({
      todolistId: todoListId2,
      status: newStatus,
    }),
  );
  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});

test("todolists should be added", () => {
  const payload = {
    todolists: startState,
  };
  type Action = BaseAction<typeof todolistsThunks.fetchTodolists.fulfilled>;

  const action: Action = {
    type: todolistsThunks.fetchTodolists.fulfilled.type,
    payload,
  };

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});
