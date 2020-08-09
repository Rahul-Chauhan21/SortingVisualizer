export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) {
    return;
  }

  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (leftIdx <= rightIdx) {
    animations.push(["comparing", leftIdx, rightIdx, pivotIdx]);
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      animations.push(["swapping", leftIdx, rightIdx, pivotIdx]);
      swap(array, leftIdx, rightIdx);
      leftIdx++;
      rightIdx--;
    }
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
    }
    if (array[pivotIdx] <= array[rightIdx]) {
      rightIdx--;
    }
  }
  animations.push(["swapping", pivotIdx, rightIdx, pivotIdx]);
  swap(array, pivotIdx, rightIdx);

  const isLeftSubArraySmaller =
    rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (isLeftSubArraySmaller) {
    quickSortHelper(array, startIdx, rightIdx - 1, animations);
    quickSortHelper(array, rightIdx + 1, endIdx, animations);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx, animations);
    quickSortHelper(array, startIdx, rightIdx - 1, animations);
  }
}

function swap(array, indexOne, indexTwo) {
  const temp = array[indexOne];
  array[indexOne] = array[indexTwo];
  array[indexTwo] = temp;
}
