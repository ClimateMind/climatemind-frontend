import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { ValueCard, ValueCardProps } from './ValueCard';

export default {
  title: 'ClimateMind/components/ValueCard',
  component: ValueCard,
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

const Template: Story<ValueCardProps> = (args) => (
  <div
    style={{
      padding: '8px',
      backgroundColor: 'lightgrey',
      height: '100vh',
    }}
  >
    <ValueCard {...args} />
  </div>
);

export const WithPosition = Template.bind({});
WithPosition.args = {
  valueId: 'hedonism',
  valueName: 'hedonism',
  valueDescription: 'All about hedonism',
  position: 1,
};

export const WithPercentageMatch = Template.bind({});
WithPercentageMatch.args = {
  valueId: 'hedonism',
  valueName: 'hedonism',
  valueDescription: 'All about hedonism',
  matchPercent: 75,
};
