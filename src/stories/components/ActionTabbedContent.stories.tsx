import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import Card from '../../components/Card';
import ActionTabbedContent, {
  ActionTabbedContentProps,
} from '../../components/ActionTabbedContent';
import { COLORS } from '../../common/styles/CMTheme';
import { TAction } from '../../types/Actions';

const dummyAction: TAction = {
  solutionTitle: 'Solution Title',
  shortDescription:
    'Aute amet cupidatat elit sit excepteur et est qui proident consectetur aliqua.',
  longDescription:
    'Quis duis deserunt ad aliqua consequat laborum nulla non in. Ullamco sint quis aliquip cillum magna nulla adipisicing minim dolore commodo consequat laboris pariatur. Proident et velit labore reprehenderit. Non cupidatat aute tempor occaecat duis anim sit incididunt. Sit proident incididunt cillum eiusmod irure nisi duis.',
  imageUrl: 'http://www.example.com',
  solutionType: 'adaptation',
};

export default {
  title: 'ClimateMind/components/TabbedContent',
  component: ActionTabbedContent,
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

const Template: Story<ActionTabbedContentProps> = (args) => (
  <ActionTabbedContent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  action: dummyAction,
};
