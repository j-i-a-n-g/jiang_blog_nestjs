import { CommonMiddleware } from './logger.middleware';

describe('CommonMiddleware', () => {
  it('should be defined', () => {
    expect(new CommonMiddleware()).toBeDefined();
  });
});
