import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Done } from "@material-ui/icons";

import ActionHeadline, { ActionHeadlineProps } from '../../components/ActionHeadline';

export default {
  title: 'ClimateMind/components/ActionHeadline',
  component: ActionHeadline,
} as Meta;

const Template: Story<ActionHeadlineProps> = (args) => <ActionHeadline {...args} />;

export const Default = Template.bind({});
Default.args = {
  // headline: 'Default',
};
export const Headline = Template.bind({});
Headline.args = {
  actionHeadline: 'Reducing Food Waste',
};

export const Icon = Template.bind({});
Icon.args = {
  actionHeadline: 'Reducing Food Waste!',
  icon:  <Done/>,
};
