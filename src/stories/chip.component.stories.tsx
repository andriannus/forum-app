import type { Meta, StoryObj } from "@storybook/react";

import { Chip } from "@/components";

const meta = {
  title: "Chip",
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Properties: Story = {
  args: {
    active: false,
    button: false,
    children: "Chip",
    small: false,
  },
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
  render: (props) => <Chip {...props} />,
};
