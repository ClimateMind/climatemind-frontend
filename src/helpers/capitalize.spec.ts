import { capitalize } from './capitalize';

describe('capitalize functions', () => {
  test('should return each word capitalize and without special characters', () => {
    expect(capitalize('hello world')).toBe('Hello World');
    expect(capitalize('hello-world')).toBe('Hello World');
    expect(capitalize('hello_world')).toBe('Hello World');
    expect(capitalize('hello')).toBe('Hello');
  });
});
