import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS } from '../../common/styles/CMTheme';
import {
  ConversationCardActions,
  ConversationCardActionsProps,
} from './ConversationCardActions';
import { StoryWrapper } from '../StoryWrapper';
import { StoryBookProviders } from '../../stories/utils/StoryBookProviders';
import { TConversation } from '../../types/Conversation';

// Dummy Data
const conversation: TConversation = {
  createdByUserId: 'be522407-31f9-4c27-af04-e5d9cace701f',
  createdDateTime: 'YYYY-DD-MM HH:MM:SS',
  conversationId: '91be0c17-0155-4a4d-9faf-f8b7dcd12b51',
  userARating: null,
  userB: {
    name: 'Sean',
  },
  state: 0,
};

const children = () => (
  <div>
    <h1>Hello</h1>
    <p>I am a react child</p>
  </div>
);

export default {
  title: 'ClimateMind/components/ConversationCardActions',
  component: ConversationCardActions,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <StoryWrapper>
          <Story />
        </StoryWrapper>
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<ConversationCardActionsProps> = (args) => (
  <ConversationCardActions {...args}>{children}</ConversationCardActions>
);

export const DefaultCard = Template.bind({});
// DefaultCard.args = {};
