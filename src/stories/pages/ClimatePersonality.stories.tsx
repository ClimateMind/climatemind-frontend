import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import StartQuiz from '../../pages/StartQuiz';

export default {
  title: 'ClimateMind/pages/static/ClimatePersonality',
  component: StartQuiz,
} as Meta;

const Template: Story<{}> = (args) => <StartQuiz {...args} />;

export const Default = Template.bind({});
Default.args = {};
