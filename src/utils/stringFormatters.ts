export const arrToString = (arr: string[]) => {
  const formattedString = arr.join(', ');

  return formattedString;
};

export const ucEveryFirstWord = (sentence: string) => {
  const word = sentence.split(' ');
  return word.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

export const ucFirst = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const stringCutter = (string = '', counts = 40) => {
  const formattedString = `${string.slice(0, counts)} ...`;

  if (string.length < counts) {
    return string;
  }

  return formattedString;
};

export const stringDashCutter = (string = '') => {
  return string.replace(/-/g, '');
};

export const parseEleText = (stringValue: string) => {
  return stringValue
    .replace(/<[^>]+>/g, '')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&hellip;/g, '…');
};
