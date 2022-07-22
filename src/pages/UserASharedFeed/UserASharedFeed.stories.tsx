// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import UserASharedFeed from './UserASharedFeed';
import { rest } from 'msw';
import { SHARED_TOPICS_RESPONSE } from '../../mocks/responseBodies/getSharedTopicsResponse';
import { SHARED_SOLUTION_DETAILS } from '../../mocks/responseBodies/getSharedSolutionDetails';
import { SHARED_IMPACTS_DETAILS } from '../../mocks/responseBodies/getSharedImpactDetails';
import { worker } from '../../mocks/browser';
import { MemoryRouter, Route } from 'react-router-dom';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from '../../contexts/session';
import { AlignmentProvider } from '../../contexts/alignment';
import { QuestionsProvider } from '../../contexts/questions';
import { ResponsesProvider } from '../../contexts/responses';

const queryClient = new QueryClient();

export default {
  title: 'ClimateMind/pages/UserASharedFeed',
  component: UserASharedFeed,
  decorators: [
    (Story) => (
      <MemoryRouter
        initialEntries={[
          '/user-a-shared-feed/66368131-9476-4DFB-9230-DF13D00DD4B9',
        ]}
      >
        <Route path="/user-a-shared-feed/:conversationId">
          <AuthProvider>
            <NotificationProvider>
              <QueryProvider>
                <QueryClientProvider client={queryClient}>
                  <ReactQueryDevtools />
                  <SessionProvider>
                    <AlignmentProvider>
                      <QuestionsProvider>
                        <ResponsesProvider>
                          <Story />
                        </ResponsesProvider>
                      </QuestionsProvider>
                    </AlignmentProvider>
                  </SessionProvider>
                </QueryClientProvider>
              </QueryProvider>
            </NotificationProvider>
          </AuthProvider>
        </Route>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <UserASharedFeed {...args} />;

export const Mocked = Template.bind({});
Mocked.decorators = [
  (Story) => {
    worker.use(
      rest.get(
        'http://localhost:5000/conversation/:conversationId/topics',
        (req, res, ctx) => {
          console.log('MOCKED GET shared impacts..');
          ctx.status(200);
          return res(ctx.json(SHARED_TOPICS_RESPONSE));
        }
      ),
      rest.get(
        'http://localhost:5000/alignment/shared-solution/:solutionIri',
        (req, res, ctx) => {
          console.log('MOCKED GET shared solution details..');
          ctx.status(200);
          return res(ctx.json(SHARED_SOLUTION_DETAILS));
        }
      ),
      rest.get(
        'http://localhost:5000/alignment/shared-impact/:impactIri',
        (req, res, ctx) => {
          console.log('MOCKED GET shared impacts..');
          ctx.status(200);
          return res(ctx.json(SHARED_IMPACTS_DETAILS));
        }
      )
    );
    return <Story />;
  },
];
