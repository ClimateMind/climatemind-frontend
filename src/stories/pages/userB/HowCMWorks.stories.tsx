import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router-dom';
import HowCMWorks from '../../../pages/userB/HowCMWorks';
import { AlignmentProvider } from '../../../contexts/alignment';

export default {
  title: 'ClimateMind/pages/userB/HowCMWorks',
  component: HowCMWorks,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AlignmentProvider>
          <Story />
        </AlignmentProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <HowCMWorks {...args} />;

export const Default = Template.bind({});
Default.args = {};
