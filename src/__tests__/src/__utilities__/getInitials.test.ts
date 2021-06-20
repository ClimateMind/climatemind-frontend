import { getInitials } from '../../../helpers/getInitials';

describe('Turning a users name into their initials', () => {
  it('It retuns NC for Nick Callaghan', () => {
    const fullname = 'Nick Callaghan';
    expect(getInitials(fullname)).toBe('NC');
  });
  it('It retuns AS for Allan Micheal Sugar', () => {
    const fullname = 'Allan Micheal Sugar';
    expect(getInitials(fullname)).toBe('AS');
  });
});
