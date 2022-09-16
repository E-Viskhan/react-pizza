export const calcPriceFromSize = (price: number, size: number) => {
  let result = 0;

  switch (size) {
    case 26:
      result = price;
      break;
    case 30:
      result = price * 1.2;
      break;
    case 40:
      result = price * 1.4;
      break;
  }

  return Math.round(result);
};
