import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

// import { Button, ButtonProps } from './Button';
import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../../common/styles/CMTheme';
import CMCard, { CMCardProps } from '../../components/CMCard';
import { Typography } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/CMCard',
  component: CMCard,
  decorators:  [
    (Story) => <div style={{ margin: '3em' }}><Story/></div>,
    (Story) => (
      <MuiThemeProvider theme={CMTheme}>
        <Story />
      </MuiThemeProvider>
    ),]
} as Meta;

const Template: Story<CMCardProps> = (args) => <CMCard {...args} />;

export const DefaultCard = Template.bind({});
DefaultCard.args = {
};

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: 'This is a Title',
    numberedCards: false,
    index: 1
};

const shortDesc = 'To make decisions we each employ three personal Values';

export const WithDescription = Template.bind({});
WithDescription.args = {
    title: 'Long title here',
    numberedCards: false,
    index: 1,
    shortDescription: `${shortDesc}`
};

// const firstParagraph = 'To make decisions we each employ three personal Values';
// const secondParagraph = 'These Values can be linked to climate concepts and Climate Mindworks by giving you a personal view of how climate change is affecting you now.';

// export const PlainTextChildren = Template.bind({});
// PlainTextChildren.args = {
//     title: 'What\'s a Climate Personality?',
//     children: `${firstParagraph}`
// };

// export const TypographyChildren = Template.bind({});
// TypographyChildren.args = {
//     title: 'What\'s a Climate Personality?',
//     children: <><Typography >{firstParagraph}</Typography><Typography >{secondParagraph}</Typography></>,
// };
