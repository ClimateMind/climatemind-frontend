import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Venn } from './Venn';
import { StoryWrapper } from '../StoryWrapper';

export default {
  title: 'ClimateMind/components/Venn',
  component: Venn,
  // argTypes: {
  //   valueId: {
  //     options: [
  //       'hedonism',
  //       'stimulation',
  //       'security',
  //       'conformity',
  //       'benevolence',
  //       'tradition',
  //       'universalism',
  //       'self_direction',
  //       'achievement',
  //       'power',
  //     ],
  //   },
  // },
} as Meta;

const Template: Story = (args) => (
  <StoryWrapper>
    <Venn {...args} />
  </StoryWrapper>
);

export const Primary = Template.bind({});
Primary.args = {};
