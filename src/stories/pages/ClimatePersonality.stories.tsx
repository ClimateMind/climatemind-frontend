import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import ClimatePersonality from '../../pages/ClimatePersonality';

export default {
  title: 'ClimateMind/pages/static/ClimatePersonality',
  component: ClimatePersonality,
} as Meta;

const Template: Story<{}> = (args) => <ClimatePersonality {...args} />;

export const Default = Template.bind({});
Default.args = {};
