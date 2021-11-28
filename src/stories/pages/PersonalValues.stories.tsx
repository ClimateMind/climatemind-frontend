import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import PersonalValuesFeed from '../../pages/PersonalValuesFeed';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../contexts/queryClient';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from '../../contexts/session';
import { QuestionsProvider } from '../../contexts/questions';
import { ResponsesProvider } from '../../contexts/responses';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';

// const queryClient = new QueryClient();

export default {
  title: 'ClimateMind/pages/PersonalValuesFeed',
  component: PersonalValuesFeed,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <NotificationProvider>
            <QueryProvider>
              {/* <QueryClientProvider client={queryClient}> */}
              <ReactQueryDevtools />
              <SessionProvider>
                <QuestionsProvider>
                  <ResponsesProvider>
                    <Story />
                  </ResponsesProvider>
                </QuestionsProvider>
              </SessionProvider>
              {/* </QueryClientProvider> */}
            </QueryProvider>
          </NotificationProvider>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <PersonalValuesFeed {...args} />;

export const Default = Template.bind({});
Default.args = {};
