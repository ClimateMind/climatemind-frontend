import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS } from '../../common/styles/CMTheme';
import ConversationCard, { ConversationCardProps } from './ConversationCard';
import { StoryWrapper } from '../StoryWrapper';
import { StoryBookProviders } from '../../stories/utils/StoryBookProviders';
import { TConversation } from '../../types/Conversation';

// Dummy Data
const conversation: TConversation = {
  conversationId: '91be0c17-0155-4a4d-9faf-f8b7dcd12b51',
  userARating: null,
  userB: {
    name: 'Sean',
  },
  state: 0,
};

export default {
  title: 'ClimateMind/components/ConversationCard',
  component: ConversationCard,
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

const Template: Story<ConversationCardProps> = (args) => (
  <ConversationCard {...args} />
);

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  conversation,
};
