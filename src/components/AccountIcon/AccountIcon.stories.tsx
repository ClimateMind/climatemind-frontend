// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import AppBar from '../../components/AppBar/AppBar';
import { AuthContext } from '../../contexts/auth';
import { StoryWrapper } from '../StoryWrapper';
import { AccountIcon } from './AccountIcon';

const queryClient = new QueryClient();

const mockAuth = {
  firstName: 'Test',
  lastName: 'User',
  userIntials: 'TU',
  accessToken: '1234',
  email: 'test@example.com',
  userId: '1234',
  isLoggedIn: true,
  quizId: '6789',
  isLoading: false,
};

export default {
  title: 'ClimateMind/components/AccountIcon',
  component: AppBar,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthContext.Provider value={mockAuth}>
            <StoryWrapper>
              <Story />
            </StoryWrapper>
          </AuthContext.Provider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <AccountIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
