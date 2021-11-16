export function isEmpty(value) {
  if (value === undefined || value === null || !value) {
    return true;
  }
  return false;
}

export function isHex(value) {
  if (isEmpty(value)) {
    return false;
  }

  if (String(value).startsWith("#")) {
    return true;
  }
  return false;
}
