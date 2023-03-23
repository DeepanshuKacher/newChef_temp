export const concatString = (...args: string[]) =>
  args.reduce(
    (previousValues, currentValue) =>
      currentValue ? previousValues + "/" + currentValue : previousValues,
    ""
  );



