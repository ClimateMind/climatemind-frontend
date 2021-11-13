import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import { COLORS } from '../../common/styles/CMTheme';
import OpenInNew  from '@material-ui/icons/OpenInNew';

export default {
  title: 'ClimateMind/components/Button',
  component: Button,
} as Meta;

const Template: Story<{}> = (args) => (
  <Wrapper bgColor={COLORS.ACCENT3} fullHeight>
    <Button {...args}>Button</Button>
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'contained',
  color: 'primary',
  disableElevation: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const InlineIcon = Template.bind({});
InlineIcon.args = {
  ...Default.args,
  disabled: true,
  endIcon: (
    <>
      <OpenInNew fontSize="small" />
    </>
  ),
};
