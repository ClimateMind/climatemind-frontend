import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS } from '../../common/styles/CMTheme';
import { CardProps } from '../../components/Card';
import MythCard from '../../components/MythCard';
import Wrapper from '../../components/Wrapper';

const myth = {
  faultyLogicDescription:
    'Jumping to conclusions\nPast climate change actually sends the opposite message than what the myth concludes.',
  iri: 'R8ZhofBtOtoHDSFtEhoLGir',
  mythClaim:
    "Climate's changed before\n\nClimate is always changing. We have had ice ages and warmer periods when alligators were found in Spitzbergen. Ice ages have occurred in a hundred thousand year cycle for the last 700 thousand years, and there have been previous periods that appear to have been warmer than the present despite CO2 levels being lower than they are now. More recently, we have had the medieval warm period and the little ice age. (from Richard Lindzen)",
  mythRebuttal:
    'Greenhouse gasses, principally CO2, have controlled most ancient climate changes. This time around humans are the cause, mainly by our CO2 emissions.',
  mythSources: [
    'https://skepticalscience.com/climate-change-little-ice-age-medieval-warm-period.htm',
  ],
  mythTitle: 'Climate has changed before',
  mythVideos: ['https://youtu.be/H5kejSYPD7U'],
};

export default {
  title: 'ClimateMind/components/MythCard',
  component: MythCard,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<CardProps> = (args) => <MythCard myth={myth} {...args} />;

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  bgColor: COLORS.SUCCESS_LIGHT,
};
