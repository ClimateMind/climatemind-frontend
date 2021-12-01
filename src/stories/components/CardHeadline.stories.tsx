import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryWrapper } from '../../components/StoryWrapper';
import Card from '../../components/Card/Card';
import { COLORS } from '../../common/styles/CMTheme';
import CardHeader, { CardHeaderProps } from '../../components/CardHeader';

export default {
  title: 'ClimateMind/components/CardHeader',
  component: CardHeader,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
} as Meta;

const Template: Story<CardHeaderProps> = (args) => (
  <Card header={<CardHeader {...args} />}></Card>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Card Heading',
  bgColor: '#FFF',
  index: 2,
};
export const WithPreTitle = Template.bind({});
WithPreTitle.args = {
  ...Default.args,
  preTitle: 'Pre-title',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  preTitle: 'Pre-title',
  cardIcon: 'idea',
};

export const WithIsLocal = Template.bind({});
WithIsLocal.args = {
  ...Default.args,
  preTitle: 'Pre-title',
  isPossiblyLocal: 1,
};

export const NumberCards = Template.bind({});
NumberCards.args = {
  ...Default.args,
  preTitle: 'No. 3',
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  ...Default.args,
  cardIcon: 'idea',
  bgColor: COLORS.ACCENT2,
};
