import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Pil, PilProps } from './Pil';

export default {
  title: 'ClimateMind/components/Pil',
  component: Pil,
} as Meta;

const Template: Story<PilProps> = (args) => (
  <div
    style={{
      backgroundColor: 'lightgrey',
      height: '100vh',
      width: '100%',
      padding: '8px',
    }}
  >
    <Pil {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  text: 'benevolance',
};
