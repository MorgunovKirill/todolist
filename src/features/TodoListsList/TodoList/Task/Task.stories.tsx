import type { Meta, StoryObj } from "@storybook/react";
import Task from "./Task";
import {
  ReduxStoreProviderDecorator,
  todoListId1,
} from "stories/ReduxStoreProviderDecorator";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "common/enums";
import { useAppSelector } from "../../../../common/utils";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: "Example/Task",
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskForStory = () => {
  let task = useAppSelector((state) => state.tasks[todoListId1][0]);

  if (!task)
    task = {
      id: v1(),
      title: "Default task",
      description: "",
      status: TaskStatuses.New,
      todoListId: v1(),
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
    };

  return <Task task={task} todoListId={todoListId1} />;
};

export const TaskWithReduxStory: Story = {
  render: () => <TaskForStory />,
};
