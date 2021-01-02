import React from 'react';
import { render, wait } from '@testing-library/react';
import sinon from 'sinon';
import * as reactQuery from 'react-query';

import SolutionsFeed from '../../pages/SolutionsFeed';

// Mock react router to simulate history.push on button click
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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
      longDescription: "No long desc available at present",
      shortDescription: "Setting a limit on emissions and creating a market for trading allowances drives down emissions by rewarding those who don't pollute and by limiting how much industries can pollute for free.",
      solutionTitle: "Enact cap and trade policy",
      solutionType: "mitigation",
      iri: "RCyBGt3EhMba7KSfwkbu9Yu",
    },{
      imageUrl: "https://c.pxhere.com/photos/36/9f/solar_panels_installation_workers_array_power_sun_electricity_energy-1028805.jpg!d",
      longDescription: "No long desc available at present",
      shortDescription: "Government investment can create jobs that reduce emissions",
      solutionTitle: "Establish A Federal Green Jobs Program",
      solutionType: "mitigation",
      iri: "R9iV4b31x0p1xmG7jvYhBtq",
    },
  ]
}

const titles = dummySolutions.solutions.map((solution) => solution.solutionTitle);

describe('General Solutions feed', () => {
  const sandbox = sinon.createSandbox();
  sandbox.stub(reactQuery, 'useQuery').returns({
    data: dummySolutions,
    status: 'sucess',
    isLoading: false,
    error: null,
  });

  it('it has correct action text', () => {
    const { getByText } = render(<SolutionsFeed />);
    expect(
      getByText(
        /Ready to take action/i
      )
    ).toBeInTheDocument();
  });

  it('Should have the correct number of cards', async () => {
    const { getAllByTestId, debug } = render(<SolutionsFeed />);
    const cards = getAllByTestId('CMCard');
    expect(cards.length).toBe(2);
  });

  it('Should contain all the titles', async () => {
    const { getByText } = render(<SolutionsFeed />);
    titles.forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });
});
