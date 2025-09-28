import BigNumber from "bignumber.js";

export const fromWei = (value: string, decimals: number = 18): string => {
  try {
    return new BigNumber(value)
      .dividedBy(new BigNumber(10).pow(decimals))
      .toString();
  } catch {
    return '0';
  }
};

export const toWei = (value: string, decimals: number = 18): string => {
  try {
    return new BigNumber(value)
      .multipliedBy(new BigNumber(10).pow(decimals))
      .toString();
  } catch {
    return '0';
  }
};
