import React, { useEffect, useState } from "react";
import { todolistAPI } from "./api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((data) => {
      setState(data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const title = "REDUX";
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todoId = "87b06d14-d2d8-488d-bfe2-fa9775fa6109";
    todolistAPI.deleteTodolist(todoId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todoId = "9b7cfdea-a08b-493f-aaf1-d8ddf3fed9da";
    const title = "React";
    todolistAPI.updateTodolist(todoId, title).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  const getTasks = () => {
    todolistAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder={"todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <button onClick={getTasks}>Get tasks</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const createTask = () => {
    todolistAPI.createTask({ todolistId, title }).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder={"todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"New title"}
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <button onClick={createTask}>Create task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const deleteTask = () => {
    todolistAPI.deleteTask({ todolistId, taskId }).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder={"todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"taskId"}
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
      />
      <button onClick={deleteTask}>Delete task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);

  const updateTaskHandler = () => {
    const arg = {
      todolistId,
      taskId,
      domainModel: {
        description,
        title: newTitle,
        status,
        priority,
        startDate: "",
        deadline: "",
      },
    };
    todolistAPI.updateTask(arg).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder={"todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"taskId"}
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"New title"}
        value={newTitle}
        onChange={(e) => setNewTitle(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"description"}
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"status"}
        value={status}
        onChange={(e) => setStatus(+e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder={"priority"}
        value={priority}
        onChange={(e) => setPriority(+e.currentTarget.value)}
      />
      <button onClick={updateTaskHandler}>Update task</button>
      <div>{JSON.stringify(state)}</div>
    </div>
  );
};
