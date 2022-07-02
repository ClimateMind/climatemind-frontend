import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  CompleteConversation,
  CompleteConversationProps,
} from './CompleteConversation';

export default {
  title: 'ClimateMind/components/CompleteConversation',
  component: CompleteConversation,
  argTypes: {
    conversationStatus: {
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

const Template: Story<CompleteConversationProps> = (args) => (
  <div style={{ margin: '30px' }}>
    <CompleteConversation {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  conversationStatus: 0,
  conversationId: '1234',
};
