import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import ConversationsLanding from '../../pages/ConversationsLanding';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../contexts/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from '../../contexts/session';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';

export default {
  title: 'ClimateMind/pages/ConversationsLanding',
  component: ConversationsLanding,
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

const Template: Story<{}> = (args) => <ConversationsLanding {...args} />;

export const Default = Template.bind({});
Default.args = {};
