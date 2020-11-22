import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../../common/styles/CMTheme';
import Header, { HeaderProps } from '../../components/Header';

export default {
  title: 'ClimateMind/components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Title = Template.bind({});
Title.args = {
  title: 'Climate Mind',
  subtitle: 'Subtitle goes here!',
};
