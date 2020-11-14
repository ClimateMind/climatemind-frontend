import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

// import { Button, ButtonProps } from './Button';
import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../../common/styles/CMTheme';
import CMCard, { CMCardProps } from '../../components/CMCard';
import { Typography } from '@material-ui/core';

export default {
  title: 'Example/components/CMCard',
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

// export const Title = Template.bind({});
// Title.args = {
//     title: 'Title',
// };

// export const LongTitle = Template.bind({});
// LongTitle.args = {
//     title: 'Long title here',
// };

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
