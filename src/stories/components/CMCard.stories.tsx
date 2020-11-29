import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

// import { Button, ButtonProps } from './Button';

import CMCard, { CMCardProps } from '../../components/CMCard';
import CMCardFoldout from '../../components/CMCardFoldout';
import CMCardOverlay from '../../components/CMCardOverlay';

export default {
  title: 'ClimateMind/components/CMCard',
  component: CMCard,
} as Meta;

const image =
  'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg';

const Template: Story<CMCardProps> = (args) => <CMCard {...args} />;

export const DefaultCard = Template.bind({});
DefaultCard.args = {};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'This is a Title',
  numberedCards: false,
  index: 1,
};

const shortDesc =
  'Personal success through demonstrating competence according to social standards is your jam. You strive to be the best and in turn can obtain social approval. You are ambitious, successful, capable and influential.';

export const WithDescription = Template.bind({});
WithDescription.args = {
  title: 'Long title here',
  numberedCards: false,
  index: 1,
  shortDescription: `${shortDesc}`,
};

export const WithImage = Template.bind({});
WithImage.args = {
  title: 'Long title here',
  numberedCards: false,
  index: 1,
  shortDescription: `${shortDesc}`,
  imageUrl:
    'https://yaleclimateconnections.org/wp-content/uploads/2018/04/041718_child_factories.jpg',
};

const detailsDesc = 'Lorem ipsum consit dolor';

export const WithFoldout = Template.bind({});
WithFoldout.args = {
  title: 'Long title here',
  numberedCards: false,
  index: 1,
  shortDescription: `${shortDesc}`,
  footer: (
    <>
      <CMCardFoldout description={detailsDesc}></CMCardFoldout>
    </>
  ),
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  title: 'CMCard Overlay!',
  numberedCards: false,
  index: 1,
  shortDescription: `${shortDesc}`,
  footer: (
    <>
      <CMCardOverlay
        title="Overlay Title"
        imageUrl={image}
        shortDescription={detailsDesc}
      />
    </>
  ),
};

export const WithActionHeadline = Template.bind({});
WithActionHeadline.args = {
  title: 'CMCard Overlay!',
  numberedCards: false,
  index: 1,
  shortDescription: `${shortDesc}`,
  footer: (
    <>
      <CMCardOverlay
        title="Overlay Title"
        imageUrl={image}
        shortDescription={detailsDesc}
      />
    </>
  ),
  actionHeadline: 'Reducing Food Waste'
};
