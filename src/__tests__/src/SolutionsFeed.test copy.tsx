import React from 'react';
import { fireEvent, getAllByText, render, wait } from '@testing-library/react';
import sinon from 'sinon';
import * as reactQuery from 'react-query';

import SolutionsFeed from '../../pages/SolutionsFeed';

window.scrollTo = jest.fn();
// Mock react router to simulate history.push on button click
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    location: {
      pathname: '/solutions',
    },
  }),
}));

const dummySolutions = {
  solutions: [
    {
      imageUrl: null,
      longDescription: 'No long desc available at present',
      shortDescription:
        "Setting a limit on emissions and creating a market for trading allowances drives down emissions by rewarding those who don't pollute and by limiting how much industries can pollute for free.",
      solutionTitle: 'Enact cap and trade policy',
      solutionType: 'mitigation',
      iri: 'RCyBGt3EhMba7KSfwkbu9Yu',
      solutionSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
    },
    {
      imageUrl:
        'https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d',
      longDescription: 'No long desc available at present',
      shortDescription:
        'Government investment can create jobs that reduce emissions',
      solutionTitle: 'Establish A Federal Green Jobs Program',
      solutionType: 'mitigation',
      iri: 'R9iV4b31x0p1xmG7jvYhBtq',
      solutionSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
    },
    {
      imageUrl:
        'https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d',
      longDescription: 'No long desc available at present',
      shortDescription:
        'Government investment can create jobs that reduce emissions',
      solutionTitle: 'Establish A City Green Jobs Program',
      solutionType: 'mitigation',
      iri: 'R9iV4b31x0p1xmG7jvYhBtq',
      solutionSpecificMythIRIs: [
        'RCqODufKJse3xkgAny5v5fI',
        'RXlELjsOUaVbJqmvO91WFL',
      ],
    },
  ],
};

const dummyMyths = [
  {
    faultyLogicDescription:
      'Jumping to conclusions\nPast climate change actually sends the opposite message than what the myth concludes.',
    iri: 'R8ZhofBtOtoHDSFtEhoLGir',
    mythClaim:
      "Climate's changed before\n\nClimate is always changing.thousand years, and there have been previous periods that appear to have been warmer than the present despite CO2 levels being lower than they are now. More recently, we have had the medieval warm period and the little ice age. (from Richard Lindzen)",
    mythRebuttal:
      'Greenhouse gasses, principally CO2, have controlled most ancient climate changes. This time around humans are the cause, mainly by our CO2 emissions.',
    mythSources: [
      'https://skepticalscience.com/climate-change-little-ice-age-medieval-warm-period.htm',
    ],
    mythTitle: 'Climate has changed before',
    mythVideos: ['https://youtu.be/H5kejSYPD7U'],
  },
  {
    faultyLogicDescription:
      'Jumping to conclusions\nPast climate change actually sends the opposite message than what the myth concludes.',
    iri: 'R8ZhofBtOtoHDSFtEhoLGir',
    mythClaim:
      "Climate's changed before\n\nClimate is always changing. We have had ice ages and warmer periods when alligators were found in Spitzbergen. Ice ages have occurred in a hundred thousand year cycle for the last 700 thousand years, and there have been previous periods that appear to have been warmer than the present despite CO2 levels being lower than they are now. More recently, we have had the medieval warm period and the little ice age. (from Richard Lindzen)",
    mythRebuttal:
      'Greenhouse gasses, principally CO2, have controlled most ancient climate changes. This time around humans are the cause, mainly by our CO2 emissions.',
    mythSources: [
      'https://skepticalscience.com/climate-change-little-ice-age-medieval-warm-period.htm',
    ],
    mythTitle: 'Climate has changed before',
    mythVideos: ['https://youtu.be/H5kejSYPD7U'],
  },
];

const titles = dummySolutions.solutions.map(
  (solution) => solution.solutionTitle
);

describe('General Solutions feed', () => {
  const sandbox = sinon.createSandbox();
  sandbox.stub(reactQuery, 'useQuery').returns({
    data: dummySolutions,
    status: 'sucess',
    isLoading: false,
    error: null,
  });
  const sandboxMyths = sinon.createSandbox();
  sandboxMyths.stub(reactQuery, 'useQueries').returns({
    data: dummyMyths,
    status: 'sucess',
    isLoading: false,
    error: null,
  });

  it('it has correct action text', () => {
    const { getByText } = render(<SolutionsFeed />);
    expect(getByText(/Ready to take action/i)).toBeInTheDocument();
  });

  it('Should have the correct number of cards', async () => {
    const { getAllByTestId, debug } = render(<SolutionsFeed />);
    const cards = getAllByTestId('CMCard');
    expect(cards.length).toBe(3);
  });

  it('Should contain all the titles', async () => {
    const { getByText } = render(<SolutionsFeed />);
    titles.forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });
});
