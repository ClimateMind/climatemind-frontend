import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import TabbedContent from '../../../components/TabbedContent';

describe('Tabbed Content Component', () => {
  it('The details content shows ', () => {
    const { getByText } = render(
      <TabbedContent details={<p>The Details Content</p>} />
    );
    expect(getByText(/The Details Content/i)).toBeInTheDocument();
  });

  it('Can specify tab names ', () => {
    const { getByText } = render(
      <TabbedContent
        tabOneName="Tab 1"
        tabTwoName="Tab 2"
        details={<p>The Details Content</p>}
      />
    );
    expect(getByText(/Tab 1/i)).toBeInTheDocument();
    expect(getByText(/Tab 2/i)).toBeInTheDocument();
  });

  it('It can change to the sources tab ', async () => {
    const { getByText } = render(
      <TabbedContent sources={<p>This is the content for the sources tab</p>} />
    );
    const button = getByText(/sources/i);
    fireEvent.click(button);
    await wait(() => {
      expect(
        getByText(/This is the content for the sources tab/i)
      ).toBeInTheDocument();
    });
  });
});
