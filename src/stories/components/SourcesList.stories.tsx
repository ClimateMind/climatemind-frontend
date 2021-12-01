import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryWrapper } from '../../components/StoryWrapper';
import Card from '../../components/Card/Card';
import { COLORS } from '../../common/styles/CMTheme';

import SourcesList, { SourcesListProps } from '../../components/SourcesList';

export default {
  title: 'ClimateMind/components/SourcesList',
  component: SourcesList,
  decorators: [
    (Story) => (
      <StoryWrapper backgroundColor={COLORS.SECONDARY}>
        <Card>
          <Story />
        </Card>
      </StoryWrapper>
    ),
  ],
} as Meta;

const dummySources = [
  'https://calmatters.org/environment/california-wildfires/2019/11/7-affordable-ways-to-protect-your-home-from-wildfires',
  'https://yaleclimateconnections.org/2020/02/goats-a-climate-friendly-option-for-clearing-brush',
];

const Template: Story<SourcesListProps> = (args) => <SourcesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  sources: dummySources,
};

export const NoSources = Template.bind({});
NoSources.args = {
  sources: [],
};
