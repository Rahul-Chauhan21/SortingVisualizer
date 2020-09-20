export function exponentialSearch(array, x) {
  if (array[0] === x) {
    return 0;
  }
  let i = 1;
  while (i < array.length && array[i] <= x) {
    i *= 2;
  }
  return binarySearch(
    array,
    Math.floor(i / 2),
    Math.min(i, array.length - 1),
    x
  );
}
function binarySearch(array, low, high, x) {
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (array[mid] === x) {
      return mid;
    } else if (array[mid] > x) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
