import { passwordRegex } from '../../../helpers/validationSchemas';

describe('Password requirements', () => {
  const isPasswordValid = (password: string) => passwordRegex.test(password);

  it('Must be min length', () => {
    expect(isPasswordValid('Passwor')).toBe(false);
  });
  it('Must not exceed max length', () => {
    const longPassword = 'p' * 129;
    expect(isPasswordValid(longPassword)).toBe(false);
  });
  it('Must Need a number or special char', () => {
    expect(isPasswordValid('Password')).toBe(false);
    expect(isPasswordValid('password')).toBe(false);
  });
  it('Accepts valid passwords', () => {
    const testPasses = [
      'Password123',
      'Password!',
      'Passworddddddddd!',
      'dddddddddddddddddds!',
      '1234567890123456789D',
    ];
    testPasses.forEach((pass) => expect(isPasswordValid(pass)).toBe(true));
  });

  it('All special chars work', () => {
    // Make a password for every valid special character
    const chars: string = '!"#$£%&\'()*+,-.:;<=>?@[]^_`{|}~';
    const testPasses = [];
    for (let char of chars) {
      testPasses.push('Password' + char);
    }
    testPasses.forEach((pass) => expect(isPasswordValid(pass)).toBe(true));
  });
});
