import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Pil, PilProps } from './Pil';
import { StoryWrapper } from '../../components/StoryWrapper';

export default {
  title: 'ClimateMind/components/Pil',
  component: Pil,
} as Meta;

const Template: Story<PilProps> = (args) => (
  <StoryWrapper>
    <Pil {...args} />
  </StoryWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  text: 'benevolance',
};
