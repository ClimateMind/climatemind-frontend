import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  ConversationStatus,
  ConversationStatusProps,
} from './ConversationStatus';

export default {
  title: 'ClimateMind/components/ConversationStatus',
  component: ConversationStatus,
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
    <ConversationStatus {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  status: 0,
  userBName: 'Nick',
};
