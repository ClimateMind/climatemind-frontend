import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Card';
import { COLORS } from '../../common/styles/CMTheme';
import CardHeader, { CardHeaderProps } from '../../components/CardHeader';

export default {
  title: 'ClimateMind/components/CardHeader',
  component: CardHeader,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
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
  isPossiblyLocal: true
};

export const NumberCards = Template.bind({});
NumberCards.args = {
  ...Default.args,
  cardIcon: 'idea',
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  ...Default.args,
  cardIcon: 'idea',
  bgColor: COLORS.ACCENT2,
};
