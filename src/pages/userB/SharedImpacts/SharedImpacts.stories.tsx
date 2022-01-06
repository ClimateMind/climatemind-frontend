// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SharedImpacts from './SharedImpacts';
import { StoryBookProviders } from '../../../stories/utils/StoryBookProviders';

export default {
  title: 'ClimateMind/pages/userB/SharedImpacts',
  component: SharedImpacts,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <Story />
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <SharedImpacts {...args} />;

export const Default = Template.bind({});
Default.args = {};
