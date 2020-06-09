export function getHeapSortAnimations(array) {
  let animations = [];
  buildMaxHeap(array, animations);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    animations.push([0, endIdx]);
    swap(0, endIdx, array);
    heapifyDown(0, endIdx - 1, array, animations);
  }
  return [animations, array];
}

function buildMaxHeap(array, animations) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let i = firstParentIdx; i >= 0; i--) {
    heapifyDown(i, array.length - 1, array, animations);
  }
}

function heapifyDown(parentIdx, endIdx, heap, animations) {
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
      animations.push([parentIdx, largerChildIdx]);
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
