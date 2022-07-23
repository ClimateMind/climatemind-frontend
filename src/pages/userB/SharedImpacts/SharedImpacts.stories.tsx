// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SharedImpacts from './SharedImpacts';
import { StoryBookProviders } from '../../../stories/utils/StoryBookProviders';
import { rest } from 'msw';
import { worker } from '../../../mocks/browser';
import { SHARED_IMPACTS_RESPONSE } from '../../../mocks/responseBodies/getSharedImpactsResponse';
import { SHARED_IMPACTS_DETAILS } from '../../../mocks/responseBodies/getSharedImpactDetails';

export default {
  title: 'ClimateMind/pages/userB/SharedImpacts',
  component: SharedImpacts,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <Story />
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <SharedImpacts {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Mocked = Template.bind({});
Mocked.decorators = [
  (Story) => {
    worker.use(
      rest.get(
        'http://localhost:5000/alignment/:alignmentScoresId/shared-impacts',
        (req, res, ctx) => {
          console.log('MOCKED GET shared impacts..');
          ctx.status(200);
          return res(ctx.json(SHARED_IMPACTS_RESPONSE));
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
// worker.use(
//   rest.get('http://localhost:5000/alignment/shared-solution/:solutionIri', (req, res, ctx) => {
//     console.log('MOCKED GET shared impacts..');
//     ctx.status(200);
//     return res(ctx.json(SHARED_IMPACTS_RESPONSE));
//   })
// ),
export const Loading = Template.bind({});
Loading.decorators = [
  (Story) => {
    worker.use(
      rest.get(
        'http://localhost:5000/alignment/:alignmentScoresId/shared-impacts',
        (req, res, ctx) => {
          console.log('MOCKED GET shared impacts..');
          ctx.status(200);
          // return res(ctx.json(SHARED_IMPACTS_RESPONSE));
          return res(ctx.delay('infinite'));
        }
      )
    );
    return <Story />;
  },
];
