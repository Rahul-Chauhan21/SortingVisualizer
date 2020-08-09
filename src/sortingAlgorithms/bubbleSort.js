export function getBubbleSortAnimations(array) {
  const animations = [];
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      animations.push(["comparing", i, i + 1]);
      if (array[i] > array[i + 1]) {
        animations.push(["swapping", i, i + 1]);
        swap(array, i, i + 1);
        isSorted = false;
      }
    }
    counter++;
  }
  return animations;
}
function swap(array, indexOne, indexTwo) {
  const temp = array[indexOne];
  array[indexOne] = array[indexTwo];
  array[indexTwo] = temp;
}
