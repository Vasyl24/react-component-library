import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SidebarMenu, type SidebarMenuProps, type MenuItem } from '../components/SidebarMenu/SidebarMenu';

const meta: Meta<SidebarMenuProps> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
};

export default meta;

const Template = (args: SidebarMenuProps) => {
  const [open, setOpen] = useState(args.open);

  return (
    <>
      <SidebarMenu {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const items1: MenuItem[] = [
  { label: 'Home', onClick: () => alert('Home clicked') },
  {
    label: 'Products',
    children: [
      { label: 'Product A', onClick: () => alert('Product A clicked') },
      { label: 'Product B', onClick: () => alert('Product B clicked') },
    ],
  },
  { label: 'About', onClick: () => alert('About clicked') },
];


export const OneLevel: StoryObj<SidebarMenuProps> = {
  render: (args) => <Template {...args} />,
  args: { open: false, items: items1 },
};
