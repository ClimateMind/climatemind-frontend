import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

// import { Button, ButtonProps } from './Button';
import ExpandableCard, {
  ExpandableCardProps,
} from '../../components/ExpandableCard';
import { Typography } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/ExpandableCard',
  component: ExpandableCard,
} as Meta;

const Template: Story<ExpandableCardProps> = (args) => (
  <ExpandableCard {...args}></ExpandableCard>
);

export const Default = Template.bind({});
Default.args = {};

export const Title = Template.bind({});
Title.args = {
  title: "What's a Climate Personality?",
};

const firstParagraph = 'To make decisions we each employ three personal Values';
const secondParagraph =
  'These Values can be linked to climate concepts and Climate Mindworks by giving you a personal view of how climate change is affecting you now.';

export const PlainTextChildren = Template.bind({});
PlainTextChildren.args = {
  title: "What's a Climate Personality?",
  children: `${firstParagraph}`,
};

export const TypographyChildren = Template.bind({});
TypographyChildren.args = {
  title: "What's a Climate Personality?",
  children: (
    <>
      <Typography>{firstParagraph}</Typography>
      <Typography>{secondParagraph}</Typography>
    </>
  ),
};
