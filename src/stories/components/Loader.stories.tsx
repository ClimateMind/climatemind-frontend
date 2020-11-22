import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../../common/styles/CMTheme';
import Loader from '../../components/Loader';

export default {
  title: 'ClimateMind/components/Loader',
  component: Loader,
} as Meta;

const Template: Story<{}> = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};
