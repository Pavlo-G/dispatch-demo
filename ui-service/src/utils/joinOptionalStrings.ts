export const joinOptionalStrings = (
  items: (string | undefined)[],
  separator = " ",
) => items.filter((item) => !!item).join(separator);
