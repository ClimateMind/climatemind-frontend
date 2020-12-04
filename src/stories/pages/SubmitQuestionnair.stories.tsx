import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import SubmitQuestionnaire from '../../pages/SubmitQuestionnaire';
import PageWithAppBar from '../../components/AppBar/PageWithAppBar';

export default {
  title: 'ClimateMind/pages/static/SubmitQuestionnaire',
  component: SubmitQuestionnaire,
  decorators: [(Story) => <PageWithAppBar component={<Story />} />],
} as Meta;

const Template: Story<{}> = (args) => <SubmitQuestionnaire {...args} />;

export const Default = Template.bind({});
Default.args = {};
