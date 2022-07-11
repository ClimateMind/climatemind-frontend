import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  ConversationState,
  ConversationStatusProps,
} from './ConversationState';

export default {
  title: 'ClimateMind/components/ConversationState',
  component: ConversationState,
  argTypes: {
    status: {
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

const Template: Story<ConversationStatusProps> = (args) => (
  <div style={{ margin: '30px' }}>
    <ConversationState {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  state: 0,
  userBName: 'Nick',
};
