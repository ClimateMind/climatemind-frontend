import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import sinon from 'sinon';
import * as reactQuery from 'react-query';
import SharedImpacts from './SharedImpacts';
import { SHARED_IMPACTS_RESPONSE } from '../../../mocks/responseBodies/getSharedImpactsResponse';

window.scrollTo = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/shared-solutions',
    },
  }),
}));


const titles = SHARED_IMPACTS_RESPONSE.climateEffects.map((effect) => effect.effectTitle);

describe('Shared Impacts Renders', () => {
  const sandbox = sinon.createSandbox();
  sandbox.stub(reactQuery, 'useQuery').returns({
    data: SHARED_IMPACTS_RESPONSE,
    status: 'sucess',
    isLoading: false,
    error: null,
  });

  it('Should have the correct numbber of cards', async () => {
    const { getAllByTestId } = render(<SharedImpacts />);
    const cards = getAllByTestId('CMCard');
    expect(cards.length).toBe(3);
  });

  it('Should contain all the titles', async () => {
    const { getByText } = render(<SharedImpacts />);
    titles.forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });

  it('Should have Next: Solutions button', async () => {
    const { getByTestId } = render(<SharedImpacts />);
    expect(getByTestId('next-solutions-button')).toBeInTheDocument();
  });

  it('Click on Next: Solutions button changes route/page', () => {
    const { getByTestId } = render(<SharedImpacts />);
    fireEvent.click(getByTestId('next-solutions-button'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/shared-solutions');
  });
});


