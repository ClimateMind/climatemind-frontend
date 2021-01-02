import React from 'react';
import { Typography } from '@material-ui/core';
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Card';
import TabbedContent, {
  TabbedContentProps,
} from '../../components/TabbedContent';
import { COLORS } from '../../common/styles/CMTheme';

export default {
  title: 'ClimateMind/components/TabbedContent',
  component: TabbedContent,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Card>
          <Story />
        </Card>
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<TabbedContentProps> = (args) => (
  <TabbedContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  details: (
    <Typography variant="body1">
      React nodes are passed on for the details
    </Typography>
  ),
  sources: (
    <Typography variant="body1">
      React nodes are passed in for the sources
    </Typography>
  ),
};
