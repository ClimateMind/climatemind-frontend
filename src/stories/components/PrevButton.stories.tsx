import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PrevButton, { PrevButtonProps } from '../../components/PrevButton';
import { StoryWrapper } from '../../components/StoryWrapper';

export default {
  title: 'ClimateMind/components/PrevButton',
  component: PrevButton,
} as Meta;

const Template: Story<PrevButtonProps> = (args) => (
  <StoryWrapper>
    <PrevButton {...args} />
  </StoryWrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  text: 'Button',
  clickPrevHandler: () => alert(0),
};
export const Default = Template.bind({});
Default.args = {
  text: 'Default',
  clickPrevHandler: () => alert(1),
};
