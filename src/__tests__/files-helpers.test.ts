import { vi } from 'vitest';
import { createFileFromString } from '../helpers/files';

describe('createFileFromString function', () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      blob: () => Promise.resolve(new Blob([''], { type: 'image/jpeg' }))
    })
  ) as any;

  test('should return a File object when valid dataUrl is provided', async () => {
    const dataUrl = 'sample-data-url';
    const file = await createFileFromString(dataUrl);
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('newFile.jpg');
    expect(file.type).toBe('image/jpeg');
  });

  test('should return null when fetch fails', async () => {
    (global.fetch as any).mockImplementationOnce(() => Promise.reject('Fetch error'));
    const dataUrl = 'invalid-data-url';
    const file = await createFileFromString(dataUrl);
    expect(file).toBeNull();
  });
});
