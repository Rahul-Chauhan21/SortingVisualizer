// O(sqrt(n)) time | O(1) space
export function jumpSearch(array, x) {
  let jumpCount = Math.floor(Math.sqrt(x));
  console.log(jumpCount);
  let blockPointer = 0;
  // jumpCount can cross array length in case of element greater than the last index.
  // 1 2 3 4 5 6 7 jumpCount = 2 x = 8
  while (array[Math.min(jumpCount, array.length) - 1] < x) {
    blockPointer = jumpCount;
    jumpCount += Math.floor(Math.sqrt(x));
    //blockPointer points outside the array
    if (blockPointer >= array.length) {
      return -1;
    }
  }
  // Linear Search to find x in the block
  while (array[blockPointer] < x) {
    blockPointer++;
    // if we reach the nextBlock or end of
    // array, element is not present.
    if (blockPointer === Math.min(jumpCount, array.length)) {
      return -1;
    }
  }
  // if element found.
  if (array[blockPointer] === x) {
    return blockPointer;
  }
  return -1;
}
