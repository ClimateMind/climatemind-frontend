import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS } from '../../common/styles/CMTheme';
import CMCard, { CMCardProps } from '../../components/Card';
import CMCardFoldout from '../../components/CardFoldout';
import CMCardOverlay from '../../components/CardOverlay';
import Wrapper from '../../components/Wrapper';

// Dummy Data
const effect = {
  title: 'Climate Effect Title',
  description:
    'Excepteur labore deserunt aliquip consectetur cupidatat aliqua. Laborum laboris duis veniam ad cupidatat dolor velit. Cillum amet ea do elit adipisicing elit Lorem. Voluptate dolor deserunt laboris nulla excepteur aute occaecat aliqua occaecat. Non ea sunt cupidatat cupidatat nostrud consequat in. Excepteur labore deserunt aliquip consectetur cupidatat aliqua. Laborum laboris duis veniam ad cupidatat dolor velit. Cillum amet ea do elit adipisicing elit Lorem. Voluptate dolor deserunt laboris nulla excepteur aute occaecat aliqua occaecat. Non ea sunt cupidatat cupidatat nostrud consequat in. Excepteur labore deserunt aliquip consectetur cupidatat aliqua. Laborum laboris duis veniam ad cupidatat dolor velit. Cillum amet ea do elit adipisicing elit Lorem. Voluptate dolor deserunt laboris nulla excepteur aute occaecat aliqua occaecat. Non ea sunt cupidatat cupidatat nostrud consequat in. Excepteur labore deserunt aliquip consectetur cupidatat aliqua. Laborum laboris duis veniam ad cupidatat dolor velit. Cillum amet ea do elit adipisicing elit Lorem. Voluptate dolor deserunt laboris nulla excepteur aute occaecat aliqua occaecat. Non ea sunt cupidatat cupidatat nostrud consequat in. Excepteur labore deserunt aliquip consectetur cupidatat aliqua. Laborum laboris duis veniam ad cupidatat dolor velit. Cillum amet ea do elit adipisicing elit Lorem. Voluptate dolor deserunt laboris nulla excepteur aute occaecat aliqua occaecat. Non ea sunt cupidatat cupidatat nostrud consequat in. Excepteur labore deserunt aliquip consectetur cupidatat aliqua. Laborum laboris duis veniam ad cupidatat dolor velit. Cillum amet ea do elit adipisicing elit Lorem. Voluptate dolor deserunt laboris nulla excepteur aute occaecat aliqua occaecat. Non ea sunt cupidatat cupidatat nostrud consequat in.',
  shortDescription:
    'Veniam qui in nisi irure anim qui aute id. Amet do adipisicing excepteur fugiat duis eu pariatur sint adipisicing dolore dolore duis. Esse irure eu nulla nostrud veniam labore fugiat laborum ex sit amet.',
  imageUrl:
    'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
  actionHeadline: 'Reducing Food Waste',
};

export default {
  title: 'ClimateMind/components/CMCard',
  component: CMCard,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<CMCardProps> = (args) => <CMCard {...args} />;

export const DefaultCard = Template.bind({});
DefaultCard.args = {};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: effect.title,
  index: 2,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  title: effect.title,
  index: 2,
  shortDescription: `${effect.shortDescription}`,
};

export const WithImage = Template.bind({});
WithImage.args = {
  title: effect.title,
  index: 1,
  shortDescription: `${effect.shortDescription}`,
  imageUrl:
    'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
};

export const AsClimateAction = Template.bind({});
AsClimateAction.args = {
  title: effect.title,
  index: 1,
  cardIcon: 'protection',
  preTitle: 'Prevention Solution',
  bgColor: COLORS.YELLOW,
  shortDescription: `${effect.shortDescription}`,
  imageUrl:
    'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
};

export const WithFoldout = Template.bind({});
WithFoldout.args = {
  title: 'Long title here',
  index: 1,
  shortDescription: `${effect.shortDescription}`,
  footer: (
    <>
      <CMCardFoldout description={effect.description}></CMCardFoldout>
    </>
  ),
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  title: 'CMCard Overlay!',
  index: 1,
  shortDescription: effect.shortDescription,
  footer: (
    <>
      <CMCardOverlay
        title="Overlay Title"
        imageUrl={effect.imageUrl}
        shortDescription={effect.shortDescription}
        description={effect.description}
      />
    </>
  ),
};

export const WithActionHeadline = Template.bind({});
WithActionHeadline.args = {
  title: 'CMCard Overlay!',
  index: 1,
  shortDescription: `${effect.shortDescription}`,
  footer: (
    <>
      <CMCardOverlay
        title="Overlay Title"
        imageUrl={effect.imageUrl}
        shortDescription={effect.shortDescription}
        description={effect.description}
      />
    </>
  ),
  actionHeadline: 'Reducing Food Waste',
};
