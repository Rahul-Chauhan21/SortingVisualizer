export const mergeSort = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  mergeSortHelper(array, 0, array.length - 1, animations);
  return array;
};

function mergeSortHelper(array, low, high, animations) {
  if (low < high) {
    const mid = Math.floor(low + (high - low) / 2);
    mergeSortHelper(array, low, mid, animations);
    mergeSortHelper(array, mid + 1, high, animations);
    merge(array, low, mid, high, animations);
  }
}

function merge(array, low, mid, high, animations) {
  var temp = Array(high - low + 1);
  let i = low,
    j = mid + 1,
    k = 0;
  while (i <= mid && j <= high) {
    if (array[i] <= array[j]) {
      temp[k++] = array[i++];
    } else {
      temp[k++] = array[j++];
    }
  }

  while (i <= mid) {
    temp[k++] = array[i++];
  }

  while (j <= high) {
    temp[k++] = array[j++];
  }

  for (let i = low; i <= high; i++) {
    array[i] = temp[i - low];
  }
}
