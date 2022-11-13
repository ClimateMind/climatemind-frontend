import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import ConversationsDashboard from '../../pages/ConversationsDashboard';
import { StoryBookProviders } from '../utils/StoryBookProviders';
import { rest } from 'msw';
import { worker } from '../../mocks/browser';
import { POST_REFRESH_RESPONSE } from '../../mocks/responseBodies/postRefreshResponse';

export default {
  title: 'ClimateMind/pages/ConversationsDashboard',
  component: ConversationsDashboard,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <Story />
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <ConversationsDashboard {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [
  (Story) => {
    worker.use(
      rest.post(
        'http://localhost:5000/refresh',
        (req, res, ctx) => {
          console.log('MOCKED POST refresh...');
          ctx.status(200);
          return res(ctx.json(POST_REFRESH_RESPONSE));
        }
      )
    );
    return <Story />;
  },
];
