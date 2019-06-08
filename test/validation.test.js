/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';

import { analyseSearchInput, isValidOLID } from '../src/validation';

describe('OLID Validation', () => {
  test('isValidOLID is false', () => {
    expect(isValidOLID('OL0M')).toEqual(false);
    expect(isValidOLID('OL01M')).toEqual(false);
    expect(isValidOLID('A1234567M')).toEqual(false);
    expect(isValidOLID('AL1234567M')).toEqual(false);
    expect(isValidOLID('OL1234567B')).toEqual(false);
    expect(isValidOLID('OL123-AB67B')).toEqual(false);
    expect(isValidOLID('OL12345678901M')).toEqual(false);
  });
  test('isValidOLID is true', () => {
    expect(isValidOLID('OL1M')).toEqual(true);
    expect(isValidOLID('OL1234M')).toEqual(true);
    expect(isValidOLID('OL1234567890M')).toEqual(true);
  });
  test('analyseSearchInput is false', () => {
    expect(analyseSearchInput('OL0M')).toEqual(false);
    expect(analyseSearchInput('OL0123M')).toEqual(false);
    expect(analyseSearchInput('OL12345AB901M')).toEqual(false);
    expect(analyseSearchInput('OL03M,OL1234M')).toEqual(false);
    expect(analyseSearchInput('OLID:OL123M,OLID:OL12A345M')).toEqual(false);
  });
  test('analyseSearchInput is true', () => {
    expect(analyseSearchInput('OL1M')).toEqual(true);
    expect(analyseSearchInput('OL1234M')).toEqual(true);
    expect(analyseSearchInput('OL1234567890M')).toEqual(true);
    expect(analyseSearchInput('OL1234M,OL12345M')).toEqual(true);
    expect(analyseSearchInput('OLID:OL1234M,OL12345M')).toEqual(true);
    expect(analyseSearchInput('OL1234M,OLID:OL12345M')).toEqual(true);
    expect(analyseSearchInput('OLID:OL123456M,OLID:OL12345M')).toEqual(true);
  });
});
