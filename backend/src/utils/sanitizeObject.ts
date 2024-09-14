// Purpose: This file contains a function that sanitizes an object by removing null values.
export const sanitizeObject = (obj: any): any => {
  if (obj === null) {
    return '';
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = sanitizeObject(obj[key]);
      return acc;
    }, {} as Record<string, any>);
  } else {
    return obj;
  }
};
