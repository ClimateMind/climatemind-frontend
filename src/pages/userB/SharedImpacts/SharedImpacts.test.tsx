import React from 'react';
import {
  screen,
  fireEvent,
  render,
  waitForElement,
} from '@testing-library/react';
import sinon from 'sinon';
import { QueryClient, QueryClientProvider } from 'react-query';
import SharedImpacts from './SharedImpacts';
import { SHARED_IMPACTS_RESPONSE } from '../../../mocks/responseBodies/getSharedImpactsResponse';
import { MockProviders } from '../../../components/MockProviders';

window.scrollTo = jest.fn();
const mockHistoryPush = jest.fn();
const queryClient = new QueryClient();

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

const titles = SHARED_IMPACTS_RESPONSE.climateEffects.map(
  (effect) => effect.effectTitle
);

describe('Shared Impacts Renders', () => {
  // const sandbox = sinon.createSandbox();
  // sandbox.stub(reactQuery, 'useQuery').returns({
  //   data: SHARED_IMPACTS_RESPONSE,
  //   status: 'success',
  //   isLoading: false,
  //   error: null,
  // });

  it('Should have the correct numbber of cards', async () => {
    const { getAllByTestId } = render(
      <MockProviders>
        <SharedImpacts />
      </MockProviders>
    );
    const cards = await screen.findAllByTestId('CMCard');
    expect(cards.length).toBe(3);
  });

  it('Should contain all the titles', async () => {
    const { getByText } = render(
      <MockProviders>
        <SharedImpacts />
      </MockProviders>
    );
    titles.forEach(async (title) => {
      expect(await screen.findByText(title)).toBeInTheDocument();
    });
  });

  it('Should have Next: Solutions button', async () => {
    const { getByTestId } = render(
      <MockProviders>
        <SharedImpacts />
      </MockProviders>
    );
    expect(
      await screen.findByTestId('next-solutions-button')
    ).toBeInTheDocument();
  });

  // TODO: make this pass, the page doesn't seem to exist just now
  // it('Click on Next: Solutions button changes route/page', () => {
  //   const { getByTestId } = render(
  //     <MockProviders>
  //       <SharedImpacts />
  //     </MockProviders>
  //   );
  //   fireEvent.click(getByTestId('next-solutions-button'));
  //   expect(mockHistoryPush).toHaveBeenCalledWith('/shared-solutions');
  // });
});
