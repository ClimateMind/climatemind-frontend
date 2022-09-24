import React from 'react';
import { act, render } from '@testing-library/react';
import DrawerDashboard from '../../../components/DrawerDashboard';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('Dashboard renders the title', () => {
  it('Header with title renders', () => {
    const { getByText } = render(
      <DrawerDashboard drawerTitle="Ongoing Conversations" />,
      { wrapper: BrowserRouter }
    );
    expect(getByText(/conversations/i)).toBeInTheDocument();
  });

  it('Open dashboard can open and show its content', async () => {
    const { getByTestId, getByText } = render(
      <DrawerDashboard drawerTitle="Ongoing Conversations">
        Dashboard content
      </DrawerDashboard>,
      { wrapper: BrowserRouter }
    );
    const button = getByTestId('dashboard-drawer-button');

    expect(() => getByText(/Dashboard content/i)).toThrow(); // the text is NOT in the document

    userEvent.click(button);
    expect(getByText(/Dashboard content/i)).toBeInTheDocument();
  });
});
