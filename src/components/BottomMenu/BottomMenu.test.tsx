import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BottomMenu } from './BottomMenu';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/climate-feed',
    },
  }),
}));

const customButtons = [
  {
    label: 'label 1',
    value: '/climate-feed',
    index: 1,
  },
  {
    label: 'label 2',
    value: '/myths',
    index: 2,
  },
  {
    label: 'label 3',
    value: '/solutions',
    index: 3,
  },
  {
    label: 'label 4',
    value: '/saved',
    index: 4,
  },
];

describe('BottomMenu', () => {
  it('Bottom menu renders', () => {
    const { getByTestId } = render(<BottomMenu />);
    expect(getByTestId('BottomMenu')).toBeInTheDocument();
  });

  it('It can have custom buttons', () => {
    const { getByTestId, getByText } = render(
      <BottomMenu links={customButtons} />
    );
    expect(getByTestId('BottomMenu')).toBeInTheDocument();
    expect(getByText(/label 1/i)).toBeInTheDocument();
    expect(getByText(/label 2/i)).toBeInTheDocument();
    expect(getByText(/label 3/i)).toBeInTheDocument();
    expect(getByText(/label 4/i)).toBeInTheDocument();
  });

  it('Bottom menu links shows', () => {
    const { getByText } = render(<BottomMenu />);
    expect(getByText(/Feed/i)).toBeInTheDocument();
    expect(getByText(/Myths/i)).toBeInTheDocument();
    expect(getByText(/Actions/i)).toBeInTheDocument();
    expect(getByText(/Talk/i)).toBeInTheDocument();
  });

  it('Click on myths links changes route/page', () => {
    const { getByText } = render(<BottomMenu />);
    fireEvent.click(getByText(/Myths/i));
    expect(mockHistoryPush).toHaveBeenCalledWith('/myths');
  });

  it('Has the correct number of buttons', async () => {
    const { getAllByRole } = render(<BottomMenu />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(4);
  });
});
