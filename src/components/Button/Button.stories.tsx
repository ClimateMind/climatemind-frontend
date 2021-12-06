import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { CMButton } from './Button';
import { ButtonProps } from '@material-ui/core';
import OpenInNew from '@material-ui/icons/OpenInNew';
import { StoryWrapper } from '../StoryWrapper';

export default {
  title: 'ClimateMind/components/Button',
  component: CMButton,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <StoryWrapper>
    <CMButton {...args}>Button</CMButton>
  </StoryWrapper>
);

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
  disableElevation: true,
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  variant: 'contained',
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  variant: 'contained',
  color: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const InlineIcon = Template.bind({});
InlineIcon.args = {
  ...Default.args,
  variant: 'contained',
  endIcon: (
    <>
      <OpenInNew fontSize="small" />
    </>
  ),
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...Default.args,
  variant: 'outlined',
  endIcon: (
    <>
      <OpenInNew fontSize="small" />
    </>
  ),
};
