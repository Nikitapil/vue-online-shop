export const createFileFromString = async (dataUrl: string) => {
  try {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], 'newFile');
  } catch (e) {
    return null;
  }
};
