export function isEmptry(value) {
  if (value === undefined || value === null || !value) {
    return true;
  }
  return false;
}
