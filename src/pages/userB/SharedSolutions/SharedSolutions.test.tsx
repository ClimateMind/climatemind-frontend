import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import * as reactQuery from 'react-query';
import SharedSolutions from './SharedSolutions';
import { SHARED_SOLUTIONS_RESPONSE } from '../../../mocks/responseBodies/getSharedSolutionsResponse';

window.scrollTo = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/path-to-sharing',
    },
  }),
}));

jest.mock('../../../hooks/useUserB', () => ({
  useUserB: () => ({
    conversationId: '8CC3F52E-88E7-4643-A490-519E170DB470',
    isUserBJourney: true,
  }),
}));

const titles = SHARED_SOLUTIONS_RESPONSE.climateSolutions.map(
  (solution) => solution.solutionTitle
);

describe('Shared Impacts Renders', () => {
  const sandbox = sinon.createSandbox();
  sandbox.stub(reactQuery, 'useQuery').returns({
    data: SHARED_SOLUTIONS_RESPONSE,
    status: 'sucess',
    isLoading: false,
    error: null,
  });

  it('Should have the correct numbber of cards', async () => {
    const { getAllByTestId } = render(<SharedSolutions />);
    const cards = getAllByTestId('CMCard');
    expect(cards.length).toBe(3);
  });

  it('Should contain all the titles', async () => {
    const { getByText } = render(<SharedSolutions />);
    titles.forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });

  it('Should have Next: Sharing button', async () => {
    const { getByTestId } = render(<SharedSolutions />);
    expect(getByTestId('next-sharing-button')).toBeInTheDocument();
  });

  // it('Click on Next: Sharing button changes route/page', () => {
  //   const { getByTestId } = render(<SharedSolutions />);
  //   fireEvent.click(getByTestId('next-sharing-button'));
  //   expect(mockHistoryPush).toHaveBeenCalledWith('/shared-summary');
  // });
});
