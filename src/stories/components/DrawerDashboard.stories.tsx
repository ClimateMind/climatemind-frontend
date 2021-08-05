import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import { COLORS } from '../../common/styles/CMTheme';
import DrawerDashboard , { DrawerDashboardProps } from '../../components/DrawerDashboard';
import { TypographyProps } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/DrawerDashboard',
  component: DrawerDashboard,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
          <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<DrawerDashboardProps> = (args) => (
  <DrawerDashboard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  // drawerTitle: 'conversation',
  // bgColor: COLORS.ACCENT8,
};

export const Content = Template.bind({});
Content.args = {
  ...Default.args,
  children: <p>content content content content content content content content</p>
};

export const BakckgroundColor = Template.bind({});
BakckgroundColor.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT8,
  children: <p>content content content content content content content content</p>,
  drawerTitle: 'open converstions'
};
