import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { COLORS } from '../../common/styles/CMTheme';
import Card, { CardProps } from '../../components/Card';
import CardFoldout from '../../components/CardFoldout';
import CardHeader from '../../components/CardHeader';
import CardOverlay from '../../components/CardOverlay';
import Wrapper from '../../components/Wrapper';
import { Typography } from '@material-ui/core';

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
  title: 'ClimateMind/components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const DefaultCard = Template.bind({});
DefaultCard.args = {
  children: (
    <Typography variant="body1">
      Any children passed to the card are rendered withing the card body.
    </Typography>
  ),
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  ...DefaultCard.args,
  header: (
    <CardHeader
      title="Card Title"
      preTitle="PRE-TITLE"
      index={2}
      cardIcon="idea"
    />
  ),
  index: 2,
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...DefaultCard.args,
  header: <CardHeader title="Card Title" index={2} />,
  index: 1,
  shortDescription: `${effect.shortDescription}`,
  imageUrl:
    'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
};

export const WithBackgroundColor = Template.bind({});
WithBackgroundColor.args = {
  ...DefaultCard.args,
  header: <CardHeader title="Card Title" index={2} />,
  index: 1,
  cardIcon: 'protection',
  preTitle: 'Prevention Solution',
  bgColor: COLORS.ACCENT2,
  shortDescription: `${effect.shortDescription}`,
  imageUrl:
    'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
};

export const WithFoldout = Template.bind({});
WithFoldout.args = {
  ...DefaultCard.args,
  index: 1,
  shortDescription: `${effect.shortDescription}`,
  footer: (
    <>
      <CardFoldout description={effect.description}></CardFoldout>
    </>
  ),
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  ...DefaultCard.args,
  index: 1,
  shortDescription: effect.shortDescription,
  footer: (
    <>
      <CardOverlay
        title="Overlay Title"
        imageUrl={effect.imageUrl}
        shortDescription={effect.shortDescription}
        description={effect.description}
      />
    </>
  ),
};
