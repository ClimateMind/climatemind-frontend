import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Wrapper, { WrapperProps } from '../../components/Wrapper';

export default {
  title: 'ClimateMind/components/Wrapper',
  component: Wrapper,
} as Meta;

const Template: Story<WrapperProps> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
};

export const BackGroundColor = Template.bind({});
BackGroundColor.args = {
  bgColor: '#39F5AD',
  children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
};

export const FullHeight = Template.bind({});
FullHeight.args = {
  bgColor: '#39F5AD',
  fullHeight: true,
  children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
};
