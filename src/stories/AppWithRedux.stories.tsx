import type { Meta, StoryObj } from "@storybook/react";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";
import App from "../app/App";

const meta: Meta<typeof App> = {
  title: "TODOLIST/AppWithRedux",
  component: App,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {};
