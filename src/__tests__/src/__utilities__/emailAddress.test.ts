import { isValidEmail } from '../../../helpers/emailAddress';

describe('Email addresses can be validated', () => {
  it('can tell an email address is valid', () => {
    const validEmail = 'hello@climatemind.org';
    const invalidEmail1 = 'hello.climatemind.org';
    const invalidEmail2 = '#hello.climatemind.org';

    expect(isValidEmail(validEmail)).toBe(true);
    expect(isValidEmail(invalidEmail1)).toBe(false);
    expect(isValidEmail(invalidEmail2)).toBe(false);
  });
});
