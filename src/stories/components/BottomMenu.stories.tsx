// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  BottomMenu,
  bottomMenuLinks,
  BottomMenuProps,
} from '../../components/BottomMenu';

export default {
  title: 'ClimateMind/components/BottomMenu',
  component: BottomMenu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div
          style={{
            width: '100%',
            height: '100vh',
            backgroundColor: 'lightgrey',
          }}
        >
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} as Meta;

const twoButtons = [bottomMenuLinks[0], bottomMenuLinks[1]];

const Template: Story<BottomMenuProps> = (args) => <BottomMenu {...args} />;

export const WithFourButtons = Template.bind({});
WithFourButtons.args = {
  links: bottomMenuLinks,
};

export const WithTwoButtons = Template.bind({});
WithTwoButtons.args = {
  links: twoButtons,
};
