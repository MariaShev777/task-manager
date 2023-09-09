import type { Meta, StoryObj } from '@storybook/react';

import { EditableSpan } from '../EditableSpan';
import {action} from '@storybook/addon-actions';


const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Start value is empty. Double-click on title to update it.'
    },
    onChange: {
      description: 'Title has been changed.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  args: {
    onChange: action('Value EditableSpan changed')
  }
};
