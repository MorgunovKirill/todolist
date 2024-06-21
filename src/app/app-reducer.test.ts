import { appActions, appReducer, InitialStateType } from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    isInitialized: false,
  };
});

test("correct error should be set", () => {
  //action
  const newState = appReducer(
    startState,
    appActions.setAppError({ error: "Some error" }),
  );

  //expectation
  expect(newState.error).toBe("Some error");
});

test("state status should be changed to loading", () => {
  //action
  const newState = appReducer(
    startState,
    appActions.setAppStatus({ status: "loading" }),
  );

  //expectation
  expect(newState.status).toBe("loading");
});
