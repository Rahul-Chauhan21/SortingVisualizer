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
