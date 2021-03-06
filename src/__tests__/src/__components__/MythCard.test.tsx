import React from 'react';
import { render } from '@testing-library/react';
import MythCard from '../../../components/MythCard';

const myth = {
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
};

describe('It shows the myth details', () => {
  it('It displays the title and the rebuttal', () => {
    const { getByText } = render(<MythCard myth={myth} />);
    expect(getByText(/Climate has changed before/i)).toBeInTheDocument();
    expect(
      getByText(
        /Greenhouse gasses, principally CO2, have controlled most ancient climate changes. This time around humans are the cause, mainly by our CO2 emissions/i
      )
    ).toBeInTheDocument();
  });

  it('The button shows', () => {
    const { getByRole } = render(<MythCard myth={myth} />);
    expect(getByRole('button').textContent).toBe('WHY?');
  });
});
