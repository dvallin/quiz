export const percentageToString = (
  fraction: number,
  total: number,
  fractionDigits = 1
): string => {
  const percentage = 100 * (1 - (total - fraction) / total);
  return Number.isNaN(percentage)
    ? "0%"
    : `${percentage.toFixed(fractionDigits)}%`;
};
