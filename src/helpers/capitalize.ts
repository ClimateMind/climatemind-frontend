const titleCase = (str: string, caracter = ' ') => {
  let splitStr = str.toLowerCase().split(caracter);
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

const format1 = /[_]+/;
const format2 = /[-]+/;

export const capitalize = (str: string) => {
  if (typeof str !== 'string') return '';

  if (format1.test(str)) {
    return titleCase(str, '_');
  } else if (format2.test(str)) {
    return titleCase(str, '-');
  } else {
    return titleCase(str);
  }
};
