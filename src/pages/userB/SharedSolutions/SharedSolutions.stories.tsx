// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import SharedSolutions from './SharedSolutions';
import { StoryBookProviders } from '../../../stories/utils/StoryBookProviders';
import { rest } from 'msw';
import { worker } from '../../../mocks/browser';
import { SHARED_SOLUTIONS_RESPONSE } from '../../../mocks/responseBodies/getSharedSolutionsResponse';
import { SHARED_SOLUTION_DETAILS } from '../../../mocks/responseBodies/getSharedSolutionDetails';

export default {
  title: 'ClimateMind/pages/userB/SharedSolutions',
  component: SharedSolutions,
  decorators: [
    (Story) => (
      <StoryBookProviders>
        <Story />
      </StoryBookProviders>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <SharedSolutions {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Mocked = Template.bind({});
Mocked.decorators = [
  (Story) => {
    worker.use(
      rest.get(
        'http://localhost:5000/alignment/:alignmentScoresId/shared-solutions',
        (req, res, ctx) => {
          console.log('MOCKED GET shared impacts..');
          ctx.status(200);
          return res(ctx.json(SHARED_SOLUTIONS_RESPONSE));
        }
      ),
      rest.get(
        'http://localhost:5000/alignment/shared-solution/:solutionIri',
        (req, res, ctx) => {
          console.log('MOCKED GET shared solution details..');
          ctx.status(200);
          return res(ctx.json(SHARED_SOLUTION_DETAILS));
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
        'http://localhost:5000/alignment/:alignmentScoresId/shared-solutions',
        (req, res, ctx) => {
          console.log('MOCKED GET shared solution..');
          ctx.status(200);
          return res(ctx.delay('infinite'));
        }
      )
    );
    return <Story />;
  },
];
