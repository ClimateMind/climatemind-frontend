import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  ConversationRating,
  ConversationRatingProps,
} from './ConversationRating';

export default {
  title: 'ClimateMind/components/ConversationRating',
  component: ConversationRating,
  argTypes: {
    rating: {
      options: {
        NoRating: null,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  },
} as Meta;

const Template: Story<ConversationRatingProps> = (args) => (
  <div style={{ margin: '30px' }}>
    <ConversationRating {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  conversationRating: null,
};

export const AfterConversationIsRated = Template.bind({});
AfterConversationIsRated.args = {
  conversationRating: 5,
};
