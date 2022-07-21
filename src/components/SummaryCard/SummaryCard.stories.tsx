import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryWrapper } from '../../components/StoryWrapper';
import Card from '../../components/Card/Card';
import { COLORS } from '../../common/styles/CMTheme';
import SummaryCard, { SummaryCardProps } from './SummaryCard';
import Typography from '@material-ui/core/Typography';

export default {
  title: 'ClimateMind/components/SummaryCard',
  component: SummaryCard,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
} as Meta;

const Template: Story<SummaryCardProps> = (args) => <SummaryCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: (
    <Typography variant="h6" component="h6">
      Summary Card Title..
    </Typography>
  ),
};
export const WithChildren = Template.bind({});
WithChildren.args = {
  ...Default.args,
  children: (
    <Typography variant="h4" component="h4">
      more text..
    </Typography>
  ),
};
