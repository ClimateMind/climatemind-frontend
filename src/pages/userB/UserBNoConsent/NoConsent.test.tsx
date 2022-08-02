import React from 'react';
import { screen, render } from '@testing-library/react';
import { NoConsent } from './UserBNoConsent';

describe('<NoConsent Page', () => {
  it('should load', () => {
    render(<NoConsent />);
    expect(true).toBe(false);
  });
});
