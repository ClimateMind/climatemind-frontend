import React from 'react';
import {MemoryRouter} from 'react-router-dom';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import { COLORS } from '../../common/styles/CMTheme';
import BottomMenu, { BottomMenuProps } from '../../components/BottomMenu';

export default {
  title: 'ClimateMind/components/BottomMenu',
  component: BottomMenu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
          <Story />
        </Wrapper>
      </MemoryRouter>
    ),
  ],
} as Meta;

const fourBottomButtons = [
  {
    label: 'Feed',
    value: 'climate-feed',
    index: 1 
  },
  {
    label: 'Myths',
    value: 'myths',
    index: 2
  },
  {
    label: 'Solutions',
    value: 'solutions',
    index: 3
  },
  {
    label: 'Saved',
    value: 'saved',
    index: 4
  },
];

const defaultButtons = [fourBottomButtons[0], fourBottomButtons[1], fourBottomButtons[2]];
const twoButtons = [fourBottomButtons[0], fourBottomButtons[1]];

const Template: Story<BottomMenuProps> = (args) => (
  <BottomMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  links: defaultButtons
};

export const WithFourButtons = Template.bind({});
WithFourButtons.args = {
  links: fourBottomButtons
};

export const WithTwoButtons = Template.bind({});
WithTwoButtons.args = {
  links: twoButtons
};
