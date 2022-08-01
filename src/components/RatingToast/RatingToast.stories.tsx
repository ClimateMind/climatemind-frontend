import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { RatingNotificationProvider } from '../../contexts/ratingNotifications';

import { RatingToast } from './RatingToast';
import { StoryWrapper } from '../StoryWrapper';
import { Button } from '@material-ui/core';
import { useToast } from '../../hooks/useToast';

export default {
  title: 'ClimateMind/components/RatingToast',
  component: RatingToast,
} as Meta;

const Template: Story = (args) => {
  const { showRatingToast } = useToast();

  return (
    <StoryWrapper>
      <RatingNotificationProvider>
        <Button
          variant="contained"
          onClick={() =>
            showRatingToast({
              userBName: 'Nick',
              conversationId: '1234',
              conversationRating: null,
              conversationState: 4,
            })
          }
        >
          Show Alert
        </Button>
      </RatingNotificationProvider>
    </StoryWrapper>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
