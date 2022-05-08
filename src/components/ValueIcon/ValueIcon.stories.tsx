import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ValueIcon, ValueIconProps } from './ValueIcon';

export default {
  title: 'ClimateMind/components/ValueIcon',
  component: ValueIcon,
  argTypes: {
    valueId: {
      options: [
        'hedonism',
        'stimulation',
        'security',
        'conformity',
        'benevolence',
        'tradition',
        'universalism',
        'self_direction',
        'achievement',
        'power',
      ],
    },
  },
} as Meta;

const Template: Story<ValueIconProps> = (args) => (
  <div style={{ margin: '30px' }}>
    <ValueIcon {...args} />
  </div>
);

export const Hedonism = Template.bind({});
Hedonism.args = {
  valueId: 'hedonism',
  valueName: 'hedonism',
};
