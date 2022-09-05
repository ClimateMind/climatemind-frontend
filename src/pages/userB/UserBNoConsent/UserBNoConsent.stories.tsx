// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { StoryBookProviders } from '../../../stories/utils/StoryBookProviders';
import { NoConsent } from './UserBNoConsent';
import { AppBarMini } from '../../../components/AppBar/AppBarMini';

export default {
  title: 'ClimateMind/pages/userB/NoConsent',
  component: NoConsent,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <AppBarMini />
        <Story />
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <NoConsent {...args} />;

// export const Default = Template.bind({});
// Default.args = {};

export const Default = Template.bind({});
