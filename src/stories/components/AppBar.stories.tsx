import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import AppBar from '../../components/AppBar/AppBar';
import { ReactQueryDevtools } from 'react-query/types/devtools';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '../../contexts/auth';
import { NotificationProvider } from '../../contexts/notifications';
import QueryProvider from '../../contexts/queryClient';
import { QuestionsProvider } from '../../contexts/questions';
import { ResponsesProvider } from '../../contexts/responses';
import { SessionProvider } from '../../contexts/session';

export default {
  title: 'ClimateMind/components/AppBar',
  component: AppBar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <NotificationProvider>
            <QueryProvider>
              {/* <ReactQueryDevtools /> */}
              <SessionProvider>
                <QuestionsProvider>
                  <ResponsesProvider>
                    <Story />
                  </ResponsesProvider>
                </QuestionsProvider>
              </SessionProvider>
            </QueryProvider>
          </NotificationProvider>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
} as Meta;

const Template: Story<{}> = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  //   children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
};

// export const BackGroundColor = Template.bind({});
// BackGroundColor.args = {
//   bgColor: '#39F5AD',
//   children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
// };

// export const FullHeight = Template.bind({});
// FullHeight.args = {
//   bgColor: '#39F5AD',
//   fullHeight: true,
//   children: <p>Occaecat ad exercitation culpa amet tempor.</p>,
// };
