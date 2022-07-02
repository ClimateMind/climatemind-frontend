import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  ConversationRatingButton,
  ConversationRatingButtonProps,
} from '../ConversationRatingButton/ConversationRatingButton';

export default {
  title: 'ClimateMind/components/ConversationRatingButton',
  component: ConversationRatingButton,
  argTypes: {
    conversationRating: {
      options: {
        NoRating: null,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
    buttonRating: {
      options: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  },
} as Meta;

const Template: Story<ConversationRatingButtonProps> = (args) => (
  <div style={{ margin: '30px' }}>
    <ConversationRatingButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  buttonRating: 1,
  conversationRating: null,
  emojiIcon: '😡',
};

export const RatingMatches = Template.bind({});
RatingMatches.args = {
  buttonRating: 5,
  conversationRating: 5,
  emojiIcon: '🥳',
};
