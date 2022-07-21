import React from 'react';
import { MockProviders } from '../MockProviders';
import { Story, Meta } from '@storybook/react/types-6-0';

import { HowYouAlignButton, HowYouAlignButtonProps } from './HowYouAlignButton';

export default {
  title: 'ClimateMind/components/HowYouAlignButton',
  component: HowYouAlignButton,
  argTypes: {
    conversationState: {
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

const Template: Story<HowYouAlignButtonProps> = (args) => (
  <MockProviders>
    <div style={{ margin: '30px' }}>
      <HowYouAlignButton {...args} />
    </div>
  </MockProviders>
);

export const Default = Template.bind({});
Default.args = {
  conversationState: 3,
  conversationId: '1234',
};
