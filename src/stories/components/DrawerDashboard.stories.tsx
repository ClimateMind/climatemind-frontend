import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import { COLORS, APPBAR_HEIGHT } from '../../common/styles/CMTheme';
import DrawerDashboard, {
  DrawerDashboardProps,
} from '../../components/DrawerDashboard';
import {
  Card,
  CardContent,
  Typography,
  TypographyProps,
} from '@material-ui/core';

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
  drawerTitle: 'conversation',
};

export const Content = Template.bind({});
Content.args = {
  ...Default.args,
  children: (
    <p>content content content content content content content content</p>
  ),
};

export const BakckgroundColor = Template.bind({});
BakckgroundColor.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT13,
  children: (
    <p>content content content content content content content content</p>
  ),
  drawerTitle: 'open converstions',
  offsetAnchorY: 0,
};

export const WithOffset = Template.bind({});
WithOffset.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT13,
  children: (
    <p>content content content content content content content content</p>
  ),
  drawerTitle: 'open converstions',
  offsetAnchorY: 56,
};

export const WithSpaceToTop = Template.bind({});
WithSpaceToTop.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT13,
  children: (
    <p>content content content content content content content content</p>
  ),
  drawerTitle: 'open converstions',
  offsetAnchorY: 56,
  spaceToTop: APPBAR_HEIGHT.NORMAL,
};

export const WithCardContent = Template.bind({});
WithCardContent.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT13,
  children: (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Invited to talk
        </Typography>
        <Typography variant="h6" component="h6">
          Placeholder for user
        </Typography>
      </CardContent>
    </Card>
  ),
  drawerTitle: 'open converstions',
  spaceToTop: APPBAR_HEIGHT.NORMAL,
};
