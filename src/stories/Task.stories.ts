import type {Meta, StoryObj} from '@storybook/react';
import Task from "../Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: 'Example/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        removeTask: {
            description: 'Task trash icon click to remove task',
            action: 'Task was removed'
        },
        changeStatus: {
            description: 'Checkbox click to change task status',
            action: 'Checkbox clicked to change task status'
        },
        changeTaskTitle: {
            description: 'Input change task title',
            action: 'Input double clicked and blured to change task title'
        },
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsDoneStory: Story = {
    args: {
        todoListId: '1',
        task: {id: '1', title: 'Some title', isDone: true,},
    }
};

export const TaskIsNotDoneStory: Story = {
  args: {
    todoListId: '1',
    task: {id: '2', title: 'Some title 2', isDone: false,},
  }
};
