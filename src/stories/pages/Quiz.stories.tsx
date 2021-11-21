// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Quiz from '../../pages/Questionnaire';
import { StoryBookProviders } from '../utils/StoryBookProviders';

export default {
  title: 'ClimateMind/pages/Quiz',
  component: Quiz,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <Story />
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <Quiz {...args} />;

export const Default = Template.bind({});
Default.args = {};
