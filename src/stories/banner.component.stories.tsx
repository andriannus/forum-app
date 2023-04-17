import type { Meta, StoryObj } from "@storybook/react";

import { Banner } from "@/components";

const meta = {
  title: "Banner",
  component: Banner,
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof Banner>;

export const Properties: Story = {
  args: {
    center: false,
    subtitle: "Selamat Datang di We The Thread",
    title: "Halo,",
  },
  render: (props) => <Banner {...props} />,
};
