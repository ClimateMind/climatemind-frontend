import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import { COLORS } from '../../common/styles/CMTheme';
import Dashboard, {
  DashboardProps,
} from '../../components/Dashboard';
import { TypographyProps } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/Dashboard',
  component: Dashboard,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
          <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<TypographyProps & DashboardProps> = (args) => (
  <Dashboard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Conversations',
  bgColor: COLORS.ACCENT8,
};

// export const Left = Template.bind({});
// Left.args = {
//   ...Default.args,
//   align: 'left' 
// };
