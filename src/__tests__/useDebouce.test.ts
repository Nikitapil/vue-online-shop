import { vi } from 'vitest';
import { useDebounce } from '../helpers/useDebounce';

describe('delayed execution', () => {
  const mockFn = vi.fn(() => {});

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should call the function after timeout', () => {
    const fn = useDebounce(mockFn);
    fn();
    expect(mockFn).toHaveBeenCalledTimes(0);

    fn();
    expect(mockFn).toHaveBeenCalledTimes(0);

    vi.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
