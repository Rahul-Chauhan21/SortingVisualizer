export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return [animations, array];
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) {
    return;
  }

  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (leftIdx <= rightIdx) {
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      animations.push(["comparison1", leftIdx, rightIdx, pivotIdx]);
      animations.push(["comparison2", leftIdx, rightIdx, pivotIdx]);
      animations.push(["overwrite", leftIdx, array[rightIdx], pivotIdx]);
      animations.push(["overwrite", rightIdx, array[leftIdx], pivotIdx]);
      const temp = array[leftIdx];
      array[leftIdx] = array[rightIdx];
      array[rightIdx] = temp;
      leftIdx++;
      rightIdx--;
    }
    if (array[leftIdx] <= array[pivotIdx]) {
      animations.push(["comparison1", leftIdx, pivotIdx, pivotIdx]);
      animations.push(["comparison2", leftIdx, pivotIdx, pivotIdx]);
      leftIdx++;
    }
    if (array[pivotIdx] <= array[rightIdx]) {
      animations.push(["comparison1", rightIdx, pivotIdx, pivotIdx]);
      animations.push(["comparison2", rightIdx, pivotIdx, pivotIdx]);
      rightIdx--;
    }
  }
  animations.push(["overwrite", pivotIdx, array[rightIdx], rightIdx]);
  animations.push(["overwrite", rightIdx, array[pivotIdx], pivotIdx]);
  const temp = array[pivotIdx];
  array[pivotIdx] = array[rightIdx];
  array[rightIdx] = temp;

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
