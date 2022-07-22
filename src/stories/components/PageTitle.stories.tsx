import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import { COLORS } from '../../common/styles/CMTheme';
import PageTitle, { PageTitleProps } from '../../components/PageTitle';
import { TypographyProps } from '@material-ui/core';

export default {
  title: 'ClimateMind/components/PageTitle',
  component: PageTitle,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
    ),
  ],
} as Meta;

const Template: Story<TypographyProps & PageTitleProps> = (args) => (
  <PageTitle {...args} />
);

export const Default = Template.bind({});

Default.args = {
  children: 'Occaecat ad exercitation culpa amet tempor,',
};

export const Left = Template.bind({});
Left.args = {
  ...Default.args,
  align: 'left',
};
