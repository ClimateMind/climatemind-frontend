import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import CMCard, { CMCardProps } from '../../components/CMCard';
import CMCardFoldout from '../../components/CMCardFoldout';
import CMCardOverlay from '../../components/CMCardOverlay';

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
} as Meta;

const Template: Story<CMCardProps> = (args) => <CMCard {...args} />;

export const DefaultCard = Template.bind({});
DefaultCard.args = {};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: effect.title,
  numberedCards: false,
  index: 2,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  title: effect.title,
  numberedCards: false,
  index: 2,
  shortDescription: `${effect.shortDescription}`,
};

export const WithImage = Template.bind({});
WithImage.args = {
  title: effect.title,
  numberedCards: false,
  index: 1,
  shortDescription: `${effect.shortDescription}`,
  imageUrl:
    'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
};

export const WithFoldout = Template.bind({});
WithFoldout.args = {
  title: 'Long title here',
  numberedCards: false,
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
  numberedCards: false,
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
  numberedCards: false,
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
