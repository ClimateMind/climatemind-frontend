import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Wrapper from '../../components/Wrapper';
import { COLORS } from '../../common/styles/CMTheme';
import TextField from '../../components/TextInput';
import { TextFieldProps } from '@material-ui/core/TextField';

export default {
  title: 'ClimateMind/components/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <Wrapper bgColor={COLORS.SECONDARY} fullHeight>
        <Story />
      </Wrapper>
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
  helperText: 'Invalid zip code',
};
