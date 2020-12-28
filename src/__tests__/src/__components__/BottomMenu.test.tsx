import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BottomMenu from '../../../components/BottomMenu';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const fourBottomButtons = [
  {
    label: 'Feed',
    value: 'climate-feed',
    index: 1 
  },
  {
    label: 'Myths',
    value: 'myths',
    index: 2
  },
  {
    label: 'Solutions',
    value: 'solutions',
    index: 3
  },
  {
    label: 'Saved',
    value: 'saved',
    index: 4
  },
];

const defaultButtons = [fourBottomButtons[0], fourBottomButtons[1], fourBottomButtons[2]];
const twoButtons = [fourBottomButtons[0], fourBottomButtons[1]];
  
describe('BottomMenu', () => {
  it('Bottom menu renders', () => {
    const { getByTestId } = render(
      <BottomMenu links={twoButtons} />
    );
    expect(getByTestId('BottomMenu')).toBeInTheDocument();
  });
  
  it('Bottom menu links shows', () => {
    const { getByText } = render(
      <BottomMenu links={defaultButtons} />
    );
    expect(getByText(/Feed/i)).toBeInTheDocument();
    expect(getByText(/Myths/i)).toBeInTheDocument();
    expect(getByText(/Solutions/i)).toBeInTheDocument();
  });
  
  it('Click on myths links changes route/page', () => {
    const { getByText } = render(
      <BottomMenu links={defaultButtons} />
    );
    fireEvent.click(getByText(/Myths/i));
    expect(mockHistoryPush).toHaveBeenCalledWith('/myths');
  });

  it('Has the correct number of buttons', async () => {
    const { queryAllByTestId } = render(<BottomMenu links={fourBottomButtons} />);
    const buttons = queryAllByTestId('BottomMenuButton');
    expect(buttons.length).toBe(4);
  });
});
