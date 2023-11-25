import { subtract, sum } from './calculator';

describe('calculator', () => {
  describe('sum', () => {
    it('should add two numbers', () => {
      expect(sum(1, 2)).toEqual(3);
    });
  });

  describe('minus', () => {
    it('should subtract two numbers', () => {
      expect(subtract(2, 1)).toEqual(1);
    });
  });
});
