export const formatPrice = (number: number) => {
  let numberToFormat = number.toFixed(2).toString();
  return numberToFormat.replace('.', ',');
};
