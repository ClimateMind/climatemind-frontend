import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../../common/styles/CMTheme';
import GreenRadio from '../../components/GreenRadio';

export default {
  title: 'ClimateMind/components/GreenRadio',
  component: GreenRadio,
  decorators:  [
    (Story) => <div style={{ margin: '3em' }}><Story/></div>,
    (Story) => (
      <MuiThemeProvider theme={CMTheme}>
        <Story />
      </MuiThemeProvider>
    ),]
} as Meta;

const Template: Story<{}> = (args) => <GreenRadio {...args} />;

export const Default = Template.bind({});
Default.args = {
};
