/**
 * Gets the mime type of a file
 * @param file
 * @returns string or null for invalid
 */

const getMimeType = (file: File): string | null => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

  const mimeTypes: { [key: string]: string } = {
    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  };

  return mimeTypes[fileExtension] || null;
};

export default getMimeType;
