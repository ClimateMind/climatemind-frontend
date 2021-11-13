// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { SessionProvider } from '../../contexts/session';
import CoreValues from '../../pages/CoreValues';

export default {
  title: 'ClimateMind/pages/CoreValues',
  component: CoreValues,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <NotificationProvider>
            <QueryProvider>
              <ReactQueryDevtools />
              <SessionProvider>
                <Story />
              </SessionProvider>
            </QueryProvider>
          </NotificationProvider>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <CoreValues {...args} />;

export const Default = Template.bind({});
Default.args = {};
