export function getInsertionSortAnimations(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      animations.push(["comparison1", j, j - 1]);
      animations.push(["comparison2", j, j - 1]);
      animations.push(["overwrite1", j - 1, array[j]]);
      animations.push(["overwrite2", j, array[j - 1]]);
      swap(j, j - 1, array);
      j--;
    }
  }
  return [animations, array];
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
