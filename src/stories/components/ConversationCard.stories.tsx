import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS } from '../../common/styles/CMTheme';
import ConversationCard, {
  ConversationCardProps,
} from '../../components/ConversationCard';
import CardFoldout from '../../components/CardFoldout';
import CardHeader from '../../components/CardHeader';
import CardOverlay from '../../components/CardOverlay';
import Wrapper from '../../components/Wrapper';
import { Typography } from '@material-ui/core';

// Dummy Data
const conversation = {
  invitedUserName: 'Sean',
  createdByUserId: 'be522407-31f9-4c27-af04-e5d9cace701f',
  createdDateTime: 'YYYY-DD-MM HH:MM:SS',
  conversationId: '91be0c17-0155-4a4d-9faf-f8b7dcd12b51',
};

export default {
  title: 'ClimateMind/components/ConversationCard',
  component: ConversationCard,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
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
