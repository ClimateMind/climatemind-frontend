import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import AppBarWithMenu from '../../../components/AppBar/AppBarWithMenu';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
const links = [
  {
    label: 'Feed',
    value: '/climate-feed',
    index: 1,
  },
  {
    label: 'Myths',
    value: '/myths',
    index: 2,
  },
  {
    label: 'Solutions',
    value: '/solutions',
    index: 3,
  },
  {
    label: 'Conversation',
    value: '/saved',
    index: 4,
  },
];

describe('AppBarWithMenu', () => {
  it('AppBarWithMenu menu renders', () => {
    const { getByTestId } = render(<MemoryRouter><AppBarWithMenu links={links}/></MemoryRouter>);
    expect(getByTestId('AppBarWithMenu')).toBeInTheDocument();
  });

  it('AppBarWithMenu has its links', () => {
    const { getByText } = render(<MemoryRouter><AppBarWithMenu links={links}/></MemoryRouter>);
    expect(getByText('Feed')).toBeInTheDocument();
    expect(getByText('Myths')).toBeInTheDocument();
    expect(getByText('Solutions')).toBeInTheDocument();
    expect(getByText('Conversation')).toBeInTheDocument();
  });

  it('The menu can open', async () => {
    const { getByTestId, getByText, getByRole } = render(<MemoryRouter><AppBarWithMenu links={links}/></MemoryRouter>);
    const button = getByRole('button');
    fireEvent.click(button);
    await wait(() => {
      expect(getByTestId('TopMenuPaper')).toBeInTheDocument();
      expect(getByText(/About ClimateMind/i)).toBeInTheDocument();
      expect(getByText(/Scientists Speak Up/i)).toBeInTheDocument();
      expect(getByTestId('socials')).toBeInTheDocument();
      expect(getByText(/email us/i)).toBeInTheDocument();
      expect(getByText(/privacy/i)).toBeInTheDocument();
    });
  });

  it('Routes to location', async () => {
    const history = createMemoryHistory();

    history.push = jest.fn();

    const { getByText } = render(
        <Router history={history}>
          <AppBarWithMenu links={links}/>
        </Router>
      );

      fireEvent.click(getByText('Feed'));

      expect(history.push).toHaveBeenCalledWith('/climate-feed');

  });

});
