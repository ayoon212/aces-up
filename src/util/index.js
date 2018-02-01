// Utility Array function
export function getLastElement(arr) {
  if (!arr) {
    return null;
  }
  return arr.length > 0 ? arr[arr.length-1] : null;
}
