import React from 'react';
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
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const bottomButtons = [
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
    label: 'Folder',
    value: 'folder',
    index: 3
  },
];
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
    label: 'Nearby',
    value: 'location',
    index: 3
  },
  {
    label: 'Folder',
    value: 'folder',
    index: 4
  },
];

const Template: Story<BottomMenuProps> = (args) => (
  <BottomMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  links: bottomButtons
};

export const WithFourButtons = Template.bind({});
WithFourButtons.args = {
  links: fourBottomButtons
};

// export const WithPreTitle = Template.bind({});
// WithPreTitle.args = {
//   ...Default.args,
//   preTitle: 'Pre-title',
// };
