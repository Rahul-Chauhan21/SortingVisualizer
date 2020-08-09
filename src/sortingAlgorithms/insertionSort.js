export function getInsertionSortAnimations(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      animations.push(["comparing", j, j - 1]);
      animations.push(["swapping", j, j - 1]);
      swap(j, j - 1, array);
      j--;
    }
  }
  return animations;
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
