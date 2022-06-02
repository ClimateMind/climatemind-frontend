// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import SubmitSetOne from '../../pages/SubmitSetOne';
import PageWithAppBar from '../../templates/PageWithAppBar';

export default {
  title: 'ClimateMind/pages/static/SubmitQuestionnaire',
  component: SubmitSetOne,
  decorators: [
    (Story) => (
      <PageWithAppBar>
        <Story />
      </PageWithAppBar>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <SubmitSetOne {...args} />;

export const Default = Template.bind({});
Default.args = {};
