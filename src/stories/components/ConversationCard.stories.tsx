import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ConversationCard, {
  ConversationCardProps,
} from '../../components/ConversationCard';
import { StoryWrapper } from '../../components/StoryWrapper';

// Dummy Data
const conversation = {
  invitedUserName: 'Sean',
  createdByUserId: 'be522407-31f9-4c27-af04-e5d9cace701f',
  createdDateTime: 'YYYY-DD-MM HH:MM:SS',
  conversationId: '91be0c17-0155-4a4d-9faf-f8b7dcd12b51',
  conversationStatus: 0,
};

export default {
  title: 'ClimateMind/components/ConversationCard',
  component: ConversationCard,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
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
