import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  ViewSelectedTopics,
  ViewSelectedTopicsProps,
} from './ViewSelectedTopics';
import { StoryBookProviders } from '../../stories/utils/StoryBookProviders';

export default {
  title: 'ClimateMind/components/ViewSelectedTopics',
  component: ViewSelectedTopics,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <Story />
      </StoryBookProviders>
    ),
  ],
  argTypes: {
    conversationState: {
      options: {
        UserBInvited: 0,
        UserBConsented: 1,
        AlignmentViewed: 2,
        TopicsViewed: 3,
        Talked: 4,
        RatingDone: 5,
      },
    },
  },
} as Meta;

const Template: Story<ViewSelectedTopicsProps> = (args) => (
  <div style={{ margin: '30px' }}>
    <ViewSelectedTopics {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  conversationState: 3,
  conversationId: '1234',
};
