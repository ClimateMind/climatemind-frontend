import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import FooterAppBar from '../../components/FooterAppBar';
import { COLORS } from '../../common/styles/CMTheme';
import Button from '../../components/Button';
import { Box, Grid, Toolbar } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/FooterAppBar',
  component: FooterAppBar,
} as Meta;

const Template: Story<{}> = (args) => (
  <Wrapper bgColor={COLORS.ACCENT3} fullHeight>
    <FooterAppBar {...args}></FooterAppBar>
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
//   color: 'primary',
  children: 'FooterAppBar',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT10,
  children: 'FooterAppBar',
};

export const WithButton = Template.bind({});
WithButton.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT10,
  children: (
    <Toolbar>
        <Button variant='contained' color='primary' disableElevation style={{ border: '1px solid #a347ff' }}>
          Next: How does ClimateMind work?
        </Button>
    </Toolbar>
  ),
};
export const WithTwoButtons = Template.bind({});
WithTwoButtons.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT10,
  children: (
    <Toolbar disableGutters={true}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        direction="row"
      >
        <Button variant='contained' color='primary' disableElevation style={{ border: '1px solid #a347ff', marginRight: '4px' }}>
          First Button
        </Button>

        <Button style={{border: '1px solid #07373B', marginLeft: '4px'}}>
          Second Button
        </Button> 
      </Grid>

      {/* <Button variant='contained' color='primary'>
        First Button
      </Button>
      <Button style={{marginLeft: '8px'}}>
        Second Button
      </Button> */}
    </Toolbar>
  ),
};
