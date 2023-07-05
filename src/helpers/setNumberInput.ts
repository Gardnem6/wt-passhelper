export const setNumberInput = (callback: any, value: string) => {
  const parsedValue = Math.abs(parseInt(value));
  callback(!Number.isNaN(parsedValue) ? parsedValue : 0);
};
