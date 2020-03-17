import {SortPipe} from './sort.pipe';

describe('Pipe: Sort', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('1', () => {
    expect(pipe.transform([1, 2, 3, 4], 'oldest')).toEqual([1, 2, 3, 4]);
  });

  it('2', () => {
    expect(pipe.transform([1, 2, 3, 4], 'newest')).toEqual([4, 3, 2, 1]);
  });

  it('1', () => {
    expect(pipe.transform([1, 2, 3, 4], '')).toEqual([1, 2, 3, 4]);
  });
});
