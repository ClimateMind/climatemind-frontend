import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../../../pages/userB/Landing';

export default {
  title: 'ClimateMind/pages/userB/Landing',
  component: Landing,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <Landing {...args} />;

export const Default = Template.bind({});
Default.args = {};
