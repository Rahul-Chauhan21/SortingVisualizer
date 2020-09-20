export function binarySearch(array, x) {
  let low = 0,
    high = array.length - 1;
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
