// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import ShareSummary from './ShareSummary';
import { StoryBookProviders } from '../../../stories/utils/StoryBookProviders';
import { rest } from 'msw';
import { worker } from '../../../mocks/browser';
import { SUMMARY_RESPONSE } from '../../../mocks/responseBodies/summaryResponse';

export default {
  title: 'ClimateMind/pages/userB/ShareSummary',
  component: ShareSummary,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <Story />
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <ShareSummary {...args} />;

// export const Default = Template.bind({});
// Default.args = {};

export const Mocked = Template.bind({});
Mocked.decorators = [
  (Story) => {
    worker.use(
      rest.get(
        'http://localhost:5000/alignment/:alignmentScoresId/summary',
        (req, res, ctx) => {
          console.log('MOCKED GET summary...');
          ctx.status(200);
          return res(ctx.json(SUMMARY_RESPONSE));
        }
      )
    );
    return <Story />;
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (Story) => {
    worker.use(
      rest.get(
        'http://localhost:5000/alignment/:alignmentScoresId/summary',
        (req, res, ctx) => {
          console.log('MOCKED GET summary...');
          ctx.status(200);
          return res(ctx.delay('infinite'));
        }
      )
    );
    return <Story />;
  },
];
