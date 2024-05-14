import { v1 } from "uuid";
import {
  removeTask,
  tasksReducer,
  updateTask,
  fetchTasks,
  createTask,
} from "./tasks-reducer";
import { TaskPriorities, TasksStateType, TaskStatuses } from "../types";
import { setTodolistsAC } from "./todolist-reducer";

let state: TasksStateType;
let todoListId1: string;
let todoListId2: string;
let todoListId3: string;

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();
  todoListId3 = v1();
  state = {
    [todoListId1]: [
      {
        id: "1",
        title: "HTML",
        description: "",
        status: TaskStatuses.Completed,
        todoListId: todoListId1,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "CSS",
        description: "",
        status: TaskStatuses.Completed,
        todoListId: todoListId1,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "JS",
        description: "",
        status: TaskStatuses.New,
        todoListId: todoListId1,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    [todoListId2]: [
      {
        id: "1",
        title: "beer",
        description: "",
        status: TaskStatuses.Completed,
        todoListId: todoListId2,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "fish",
        description: "",
        status: TaskStatuses.Completed,
        todoListId: todoListId2,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "bread",
        description: "",
        status: TaskStatuses.New,
        todoListId: todoListId2,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    [todoListId3]: [
      {
        id: "1",
        title: "bar",
        description: "",
        status: TaskStatuses.Completed,
        todoListId: todoListId3,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "chess",
        description: "",
        status: TaskStatuses.Completed,
        todoListId: todoListId3,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "books",
        description: "",
        status: TaskStatuses.New,
        todoListId: todoListId3,
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("2 todolist should be incremented by 1 new Task", () => {
  const newTask = {
    id: "3",
    title: "books",
    description: "",
    status: TaskStatuses.New,
    todoListId: todoListId2,
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: TaskPriorities.Low,
  };

  //action
  const action = createTask.fulfilled(newTask, "", {
    title: newTask.title,
    todolistId: newTask.todoListId,
  });

  const newState = tasksReducer(state, action);

  //expectation

  expect(newState[todoListId2].length).toBe(4);
});

test("1 todolist 1 task should be removed", () => {
  const taskIdToChange = "1";
  //action
  const param = { todolistId: todoListId1, taskId: taskIdToChange };

  const action = removeTask.fulfilled(param, "", param);

  const newState = tasksReducer(state, action);

  //expectation

  expect(newState[todoListId1].length).toBe(2);
  expect(
    newState[todoListId1].every((task) => task.id !== taskIdToChange),
  ).toBeTruthy();
});

test('First Task of 3 todolist title should be changed to "Bar"', () => {
  const taskIdToChange = "1";

  //action
  const newState = tasksReducer(
    state,
    updateTask.fulfilled(
      {
        todolistId: todoListId3,
        taskId: taskIdToChange,
        model: { title: "Bar" },
      },
      "",
      {
        todolistId: todoListId3,
        taskId: taskIdToChange,
        domainModel: { title: "Bar" },
      },
    ),
  );

  //expectation

  expect(
    newState[todoListId3].find((el) => el.id === taskIdToChange)?.title,
  ).toBe("Bar");
});

test('Second Task of 2 todolist title should be changed to false"', () => {
  const taskIdToChange = "2";

  //action
  const newState = tasksReducer(
    state,
    updateTask.fulfilled(
      {
        todolistId: todoListId2,
        taskId: taskIdToChange,
        model: { status: TaskStatuses.New },
      },
      "",
      {
        todolistId: todoListId2,
        taskId: taskIdToChange,
        domainModel: { status: TaskStatuses.New },
      },
    ),
  );

  //expectation

  expect(
    newState[todoListId1].find((el) => el.id === taskIdToChange)?.status,
  ).toBe(2);
  expect(
    newState[todoListId2].find((el) => el.id === taskIdToChange)?.status,
  ).toBe(0);
});

test("empty arrays should be added when we set todolists", () => {
  const action = setTodolistsAC({
    todolists: [
      { id: todoListId1, title: "What to learn", addedDate: "", order: 0 },
      { id: todoListId2, title: "What to buy", addedDate: "", order: 0 },
    ],
  });

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState[todoListId1]).toStrictEqual([]);
  expect(endState[todoListId2]).toStrictEqual([]);
});

test("tasks should be added for todolist", () => {
  const action = fetchTasks.fulfilled(
    {
      todolistId: todoListId1,
      tasks: state[todoListId1],
    },
    "",
    todoListId1,
  );

  const endState = tasksReducer(
    {
      [todoListId2]: [],
      [todoListId1]: [],
    },
    action,
  );

  expect(endState[todoListId1].length).toBe(3);
  expect(endState[todoListId2].length).toBe(0);
});
