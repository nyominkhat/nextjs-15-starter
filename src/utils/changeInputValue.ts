export const formatCurrency = (value: string) => {
  const cleanedInput = value.replace(/\D/g, '');
  let numericValue = cleanedInput.replace(/[^0-9]/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const changeInputValue = (inputValue: string, breakLengths: number[] = []) => {
  const cleanedInput = inputValue.replace(/\D/g, '');

  let result = '';
  let index = 0;

  if (breakLengths.length === 0) {
    return cleanedInput;
  }

  for (let length of breakLengths) {
    if (index + length >= cleanedInput.length) {
      result += cleanedInput.slice(index);
      index += length;
      break;
    }
    result += cleanedInput.slice(index, index + length) + '-';
    index += length;
  }

  if (index < cleanedInput.length) {
    result += cleanedInput.slice(index);
  }

  return result.endsWith('-') ? result.slice(0, -1) : result;
};

export const formatPercentage = (value: string) => {
  const cleanedInput = value.replace(/\D/g, '');
  const numericValue = parseFloat(cleanedInput);

  if (numericValue >= 0 && numericValue <= 100) {
    return numericValue.toLocaleString();
  }
};
