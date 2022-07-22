import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import ConversationsDashboard from '../../pages/ConversationsDashboard';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../contexts/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from '../../contexts/session';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';

export default {
  title: 'ClimateMind/pages/ConversationsDashboard',
  component: ConversationsDashboard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <NotificationProvider>
            <QueryProvider>
              <ReactQueryDevtools />
              <SessionProvider>
                {/* <QuestionsProvider>
                  <ResponsesProvider>
                    <PersonalityProvider>  */}
                <Story />
                {/* </PersonalityProvider>
                  </ResponsesProvider>
                </QuestionsProvider> */}
              </SessionProvider>
            </QueryProvider>
          </NotificationProvider>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <ConversationsDashboard {...args} />;

export const Default = Template.bind({});
Default.args = {};
