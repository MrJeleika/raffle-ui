export const formatUSD = (number: any) => {
  const etherValue = Number(number) / 100000000000000;
  return `$${etherValue.toFixed(2)}`;
};

export const formatERC20 = (number: any) => {
  const etherValue = Number(number) / 10 ** 18;
  return `${etherValue.toFixed(2)}`;
};
