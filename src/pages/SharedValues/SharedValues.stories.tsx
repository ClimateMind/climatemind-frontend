// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { SessionProvider } from '../../contexts/session';
import { SharedValues } from './SharedValues';
import { MockProviders } from '../../components/MockProviders';
import PageWithVanillaAppBar from '../../components/AppBar/PageWithVanillaAppBar';

export default {
  title: 'ClimateMind/pages/values/SharedValues',
  component: SharedValues,
  decorators: [
    (Story) => (
      <MockProviders>
        <Story />
      </MockProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => (
  <MockProviders>
    <PageWithVanillaAppBar component={<SharedValues {...args} />} />
  </MockProviders>
);

export const Default = Template.bind({});
Default.args = {};
