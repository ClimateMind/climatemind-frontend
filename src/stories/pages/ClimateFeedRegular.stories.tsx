import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
// import Home from '../../pages/Home'
import ClimateFeed from '../../pages/ClimateFeed';

export default {
  title: 'ClimateMind/pages/ClimateFeedRegular',
  component: ClimateFeed
} as Meta;

const Template: Story<{}> = (args) => <ClimateFeed {...args} />;

export const Default = Template.bind({});
Default.args = {};

