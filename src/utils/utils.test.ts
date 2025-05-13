// sum.test.js
import { expect, test, assert } from 'vitest';
import { sum } from './utils.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  //   expect(sum()).toThrowError('invalid params sum')
});
