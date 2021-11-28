// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import VanillaAppBar from '../../components/AppBar/VanillaAppBar';

export default {
  title: 'ClimateMind/components/VanillaAppBar',
  component: VanillaAppBar,
} as Meta;

const Template: Story<{}> = (args) => <VanillaAppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  //   children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
};

// export const BackGroundColor = Template.bind({});
// BackGroundColor.args = {
//   bgColor: '#39F5AD',
//   children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
// };

// export const FullHeight = Template.bind({});
// FullHeight.args = {
//   bgColor: '#39F5AD',
//   fullHeight: true,
//   children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
// };
