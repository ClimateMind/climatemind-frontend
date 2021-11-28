import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Wrapper from '../../components/PageSection';
import {
  ValueCard,
  ValueCardProps,
} from '../../components/ValueCard/ValueCard';

export default {
  title: 'ClimateMind/components/ValueCard',
  component: ValueCard,
  decorators: [
    (Story) => (
      <Wrapper>
        <div style={{ margin: '1em' }}>
          <Story />
        </div>
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<ValueCardProps> = (args) => <ValueCard {...args} />;

export const Security = Template.bind({});
Security.args = {
  valueName: 'security',
  position: 1,
  valueDescription:
    'A feeling of safety, stability, and order is very important to you; this is true likely whether in society at large, at work, in your home, or in your relationships.',
};
