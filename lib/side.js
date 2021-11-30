export function isEmpty(value) {
  if (value === undefined || value === null || !value) {
    return true;
  }
  return false;
}

export function isHex(value) {
  let isHex = String(value).match(/^#(?:[0-9a-fA-F]{3}){1,2}$/);

  if (isHex) return true;
  else return false;
}
