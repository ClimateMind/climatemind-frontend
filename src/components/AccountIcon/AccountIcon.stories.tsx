// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router-dom';
import AppBar from '../../components/AppBar/AppBar';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { QuestionsProvider } from '../../contexts/questions';
import { ResponsesProvider } from '../../contexts/responses';
import { SessionProvider } from '../../contexts/session';
import { AccountIcon } from './AccountIcon';
import { AuthContext } from '../../contexts/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StoryWrapper } from '../';

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
};

export default {
  title: 'ClimateMind/components/AccountIcon',
  component: AppBar,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuth}>
          <Story />
        </AuthContext.Provider>
      </QueryClientProvider>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <AccountIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
