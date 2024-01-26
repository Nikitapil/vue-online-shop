export const createFileFromString = async (dataUrl: string) => {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], 'newFile.jpg', { type: 'image/jpeg' });
  } catch (e) {
    return null;
  }
};
