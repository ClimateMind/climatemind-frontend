import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import { COLORS } from '../../common/styles/CMTheme';

export default {
  title: 'ClimateMind/components/Button',
  component: Button,
} as Meta;

const Template: Story<{}> = (args) => (
  <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
    <Button {...args}>Button</Button>
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'contained',
  color: 'primary',
  disableElevation: true,
};
