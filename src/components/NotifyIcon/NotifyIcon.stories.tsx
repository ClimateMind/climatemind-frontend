import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { NotifyIcon, NotifyIconProps } from './NotifyIcon';
import { StoryBookProviders } from '../../stories/utils/StoryBookProviders';
import { StoryWrapper } from '../StoryWrapper';
import { Card } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/NotifyIcon',
  component: NotifyIcon,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <StoryWrapper>
          <Card>
            <Story />
          </Card>
        </StoryWrapper>
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<NotifyIconProps> = (args) => (
  <div style={{ margin: '30px' }}>
    <NotifyIcon {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  state: 1,
};
