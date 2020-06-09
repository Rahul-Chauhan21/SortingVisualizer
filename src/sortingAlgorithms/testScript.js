export function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
  return array;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray) {
  if (startIdx < endIdx) {
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
  }
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function bubbleSort(array) {
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        isSorted = false;
      }
    }
    counter++;
  }
  return array;
}

export function quickSort(array) {
  quickSortHelper(array, 0, array.length - 1);
  return array;
}

function quickSortHelper(array, startIdx, endIdx) {
  if (startIdx >= endIdx) {
    return;
  }

  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (leftIdx <= rightIdx) {
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      const temp = array[leftIdx];
      array[leftIdx] = array[rightIdx];
      array[rightIdx] = temp;
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

  const temp = array[pivotIdx];
  array[pivotIdx] = array[rightIdx];
  array[rightIdx] = temp;

  const isLeftSubArraySmaller =
    rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (isLeftSubArraySmaller) {
    quickSortHelper(array, startIdx, rightIdx - 1);
    quickSortHelper(array, rightIdx + 1, endIdx);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx);
    quickSortHelper(array, startIdx, rightIdx - 1);
  }
}

export function heapSort(array) {
  buildMaxHeap(array);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    swap(0, endIdx, array);
    heapifyDown(0, endIdx - 1, array);
  }
  return array;
}

function buildMaxHeap(array) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let i = firstParentIdx; i >= 0; i--) {
    heapifyDown(i, array.length - 1, array);
  }
}

function heapifyDown(parentIdx, endIdx, heap) {
  let leftChildIdx = parentIdx * 2 + 1;
  while (leftChildIdx <= endIdx) {
    let largerChildIdx = leftChildIdx;
    const rightChildIdx = parentIdx * 2 + 2 <= endIdx ? parentIdx * 2 + 2 : -1;
    if (rightChildIdx !== -1 && heap[rightChildIdx] > heap[leftChildIdx]) {
      largerChildIdx = rightChildIdx;
    }
    if (heap[parentIdx] > heap[largerChildIdx]) {
      return;
    } else {
      swap(parentIdx, largerChildIdx, heap);
      parentIdx = largerChildIdx;
      leftChildIdx = parentIdx * 2 + 1;
    }
  }
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

export function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      swap(j, j - 1, array);
      j--;
    }
  }
  return array;
}
