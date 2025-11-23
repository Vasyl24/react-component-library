import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input, type InputProps } from '../components/Input/Input';

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['text', 'password', 'number'],
    },
    clearable: { control: 'boolean' },
  },
  args: {
    value: '',
    placeholder: 'Type here...',
    label: 'Example input',
    type: 'text',
    clearable: false,
  },
};

export default meta;

const Template = (args: InputProps) => {
  const [value, setValue] = React.useState(args.value ?? '');
  return <Input {...args} value={value} onChange={setValue} />;
};

export const Text: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'text',
    label: 'Text input',
    placeholder: 'Your name',
    clearable: false,
  },
};

export const TextClearable: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'text',
    label: 'Clearable text',
    placeholder: 'Start typing and clear',
    clearable: true,
  },
};

export const Password: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    clearable: false,
  },
};

export const PasswordClearable: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'password',
    label: 'Password (clearable)',
    placeholder: 'Enter password',
    clearable: true,
  },
};

export const Number: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'number',
    label: 'Age',
    placeholder: '18',
    clearable: true,
  },
};
