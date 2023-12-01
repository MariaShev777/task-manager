import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EditableSpan } from 'common/components';

const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Start value is empty. Double-click on title to update it.',
    },
    onChange: {
      description: 'Title has been changed.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  args: {
    onChange: action('Value EditableSpan changed'),
  },
};
