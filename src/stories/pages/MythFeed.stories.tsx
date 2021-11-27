import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import MythFeed from '../../pages/MythFeed';
import { MemoryRouter } from 'react-router-dom';
import QueryProvider from '../../contexts/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SessionProvider } from '../../contexts/session';
import { QuestionsProvider } from '../../contexts/questions';
import { ResponsesProvider } from '../../contexts/responses';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import { rest } from 'msw';
import { worker } from '../../mocks/browser';

export default {
  title: 'ClimateMind/pages/MythFeed',
  component: MythFeed,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <QueryProvider>
          <ReactQueryDevtools />
          <Story />
        </QueryProvider>
      </MemoryRouter>
    ),
    (Story) => {
      // Reset request handlers added in individual stories.
      worker.resetHandlers();
      return <Story />;
    },
  ],
} as Meta;

const Template: Story<{}> = (args) => <MythFeed {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.decorators = [
  (Story) => {
    worker.use(
      rest.get('http://localhost:5000/myths', (req, res, ctx) => {
        // Mock an infinite loading state.
        return res(ctx.delay('infinite'));
      })
    );
    return <Story />;
  },
];
