import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Card';
import { COLORS } from '../../common/styles/CMTheme';

import SourcesList, { SourcesListProps } from '../../components/SourcesList';

export default {
  title: 'ClimateMind/components/SourcesList',
  component: SourcesList,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Card>
          <Story />
        </Card>
      </Wrapper>
    ),
  ],
} as Meta;

const dummySources = [
  'http://www.climatemind.org',
  'https://scientistsspeakup.org/',
  'https://www.stanford.edu/',
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
