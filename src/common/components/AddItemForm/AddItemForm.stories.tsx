import type { Meta, StoryObj } from "@storybook/react";
import { AddItemForm } from "./AddItemForm";
import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: "Example/AddItemForm",
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: "Button click callback",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormBaseExampleStory: Story = {};

export const AddItemFormStoryWithError: Story = {};

// export const AddItemFormDisabledExample = () => {
//   return <AddItemForm addItem={action("Button inside form clicked")} disabled={true} />
// }
