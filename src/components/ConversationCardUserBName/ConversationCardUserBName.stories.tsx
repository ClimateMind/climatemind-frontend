// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { StoryBookProviders } from '../../stories/utils/StoryBookProviders';
import { StoryWrapper } from '../StoryWrapper';
import {
  ConversationCardUserBName,
  ConversationCardUserBNameProps,
} from './ConversationCardUserBName';
import { Card } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/ConversationCardUserBName',
  component: ConversationCardUserBName,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <StoryWrapper>
          <Card style={{ padding: '0.2em 0.5em' }}>
            <Story />
          </Card>
        </StoryWrapper>
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<ConversationCardUserBNameProps> = (args) => (
  <ConversationCardUserBName {...args} />
);

export const Default = Template.bind({});
Default.args = {
  conversationId: 'd89b43ba-d140-40b2-977a-0db51e7c076c',
  invitedUserName: 'Nick',
};
