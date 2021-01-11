import {
  isValidZipCode,
  containsInvalidZipChars,
} from '../../../helpers/zipCodes';

describe('Zip codes can be validated', () => {
  it('Can validate a zip code', () => {
    const validZipCode = '90210';
    const invalidZipCode = 'AB22 1EE';
    expect(isValidZipCode(validZipCode)).toBe(true);
    expect(isValidZipCode(invalidZipCode)).toBe(false);
  });
  it('Can check zip code input for invalid chars', () => {
    const validInputs = ['1', '12', '123', '1234', '12345'];
    const invalidInputs = ['A', '1234A', '123456', '12AA4'];
    validInputs.forEach((input) => {
      expect(containsInvalidZipChars(input)).toBe(false);
    });
    invalidInputs.forEach((input) => {
      expect(containsInvalidZipChars(input)).toBe(true);
    });
  });
});
