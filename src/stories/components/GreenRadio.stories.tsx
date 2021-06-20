import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import GreenRadio from '../../components/GreenRadio';

export default {
  title: 'ClimateMind/components/GreenRadio',
  component: GreenRadio,
} as Meta;

const Template: Story<{}> = (args) => <GreenRadio {...args} />;

export const Default = Template.bind({});
Default.args = {};
