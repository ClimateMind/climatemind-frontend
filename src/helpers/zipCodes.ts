export const isValidZipCode = (zip: string): boolean => {
  const re = /^\d{5}$/;
  const isValid = re.test(zip);
  return isValid;
};

export const containsInvalidZipChars = (zip: string): boolean => {
  const re = /^\d{0,5}$/;
  const isValid = re.test(zip);
  return !isValid;
};
