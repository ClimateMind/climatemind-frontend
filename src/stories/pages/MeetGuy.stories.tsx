import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import MeetGuy from '../../pages/MeetGuy';
import PageWithAppBar from '../../components/AppBar/PageWithAppBar';

export default {
  title: 'ClimateMind/pages/static/MeetGuy',
  component: MeetGuy,
  decorators: [(Story) => <PageWithAppBar component={<Story />} />],
} as Meta;

const Template: Story<{}> = (args) => <MeetGuy {...args} />;

export const Default = Template.bind({});
Default.args = {};
