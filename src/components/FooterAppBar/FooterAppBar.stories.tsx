import { Grid, Toolbar, Typography } from '@material-ui/core';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { COLORS } from '../../common/styles/CMTheme';
import { Button } from '../Button';
import Wrapper from '../Wrapper';
import { FooterAppBar } from './FooterAppBar';

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
      <Button
        variant="contained"
        color="primary"
        disableElevation
        style={{ border: '1px solid #a347ff' }}
      >
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
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      direction="row"
    >
      <Button
        variant="contained"
        color="primary"
        disableElevation
        style={{ border: '1px solid #a347ff', marginRight: '4px' }}
      >
        First Button
      </Button>

      <Button style={{ border: '1px solid #07373B', marginLeft: '4px' }}>
        Second Button
      </Button>
    </Grid>
  ),
};

export const WithOneButtons = Template.bind({});
WithOneButtons.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT10,
  align: 'center',
  children: (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      style={{ border: '1px solid #a347ff', marginRight: '4px' }}
    >
      First Button
    </Button>
  ),
};

export const WithTypography = Template.bind({});
WithTypography.args = {
  ...Default.args,
  bgColor: COLORS.ACCENT10,
  align: 'space-between',
  children: (
    <>
      <Typography variant="body1">SELECTED 0 OF 1</Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        style={{ border: '1px solid #a347ff', marginRight: '4px' }}
      >
        Continue
      </Button>
    </>
  ),
};
