import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryWrapper } from '../../components/StoryWrapper';
import { COLORS } from '../../common/styles/CMTheme';
import TextField from '../../components/TextInput';
import { TextFieldProps } from '@material-ui/core/TextField';

export default {
  title: 'ClimateMind/components/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <StoryWrapper backgroundColor={COLORS.SECONDARY}>
        <Story />
      </StoryWrapper>
    ),
  ],
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Zip code',
  placeholder: '90210',
  fullWidth: true,
  variant: 'filled',
  color: 'secondary',
};
export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: true,
  helperText: 'Enter a US zip code.',
};
