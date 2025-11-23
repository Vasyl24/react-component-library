import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, type ToastProps } from '../components/Toast/Toast';

const meta: Meta<ToastProps> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['info', 'success', 'error', 'warning'],
    },
    duration: { control: 'number' },
    closable: { control: 'boolean' },
  },
  args: {
    message: 'This is a toast message',
    type: 'info',
    duration: 3000,
    closable: false,
  },
};

export default meta;

const Template = (args: ToastProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {open && (
        <Toast
          {...args}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}

      <div style={{ padding: 24 }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          Show toast
        </button>
        <p style={{ marginTop: 12, color: '#555' }}>
          Click "Show toast" to re-open. Toast auto-closes after <strong>{args.duration} ms</strong>.
        </p>
      </div>
    </div>
  );
};

export const Info: StoryObj<ToastProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'info',
    message: 'Information toast — plain.',
    duration: 2000,
    closable: false,
  },
};

export const Success: StoryObj<ToastProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'success',
    message: 'Success! Your changes were saved.',
    duration: 3000,
    closable: true,
  },
};

export const Error: StoryObj<ToastProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'error',
    message: 'Error: something went wrong.',
    duration: 3500,
    closable: true,
  },
};

export const Warning: StoryObj<ToastProps> = {
  render: (args) => <Template {...args} />,
  args: {
    type: 'warning',
    message: 'Warning: check your inputs.',
    duration: 3000,
    closable: false,
  },
};
