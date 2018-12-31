export const round = number => parseInt(number, 10);
export const cut = (number, float = 2) =>
  round(number * 10 ** float) / 10 ** float;
