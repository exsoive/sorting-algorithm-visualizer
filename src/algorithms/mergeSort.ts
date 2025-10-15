import { SortStep, ElementState } from '../types';

export function* mergeSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  yield* mergeSortHelper(arr, 0, arr.length - 1);

  // Mark all elements as sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = ElementState.SORTED;
  }
  yield {
    array: [...arr],
    sortedIndices: arr.map((_, i) => i),
  };
}

function* mergeSortHelper(
  arr: Array<{ value: number; state: ElementState }>,
  left: number,
  right: number
): Generator<SortStep> {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    yield* mergeSortHelper(arr, left, mid);
    yield* mergeSortHelper(arr, mid + 1, right);
    yield* merge(arr, left, mid, right);
  }
}

function* merge(
  arr: Array<{ value: number; state: ElementState }>,
  left: number,
  mid: number,
  right: number
): Generator<SortStep> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  // Highlight the range being merged
  for (let idx = left; idx <= right; idx++) {
    arr[idx].state = ElementState.COMPARING;
  }
  yield {
    array: [...arr],
    comparingIndices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
  };

  while (i < leftArr.length && j < rightArr.length) {
    // Compare elements
    arr[k].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [k],
    };

    if (leftArr[i].value <= rightArr[j].value) {
      arr[k] = { ...leftArr[i], state: ElementState.SWAPPING };
      i++;
    } else {
      arr[k] = { ...rightArr[j], state: ElementState.SWAPPING };
      j++;
    }

    yield {
      array: [...arr],
      swappingIndices: [k],
    };

    arr[k].state = ElementState.DEFAULT;
    k++;
  }

  // Copy remaining elements from leftArr
  while (i < leftArr.length) {
    arr[k] = { ...leftArr[i], state: ElementState.SWAPPING };

    yield {
      array: [...arr],
      swappingIndices: [k],
    };

    arr[k].state = ElementState.DEFAULT;
    i++;
    k++;
  }

  // Copy remaining elements from rightArr
  while (j < rightArr.length) {
    arr[k] = { ...rightArr[j], state: ElementState.SWAPPING };

    yield {
      array: [...arr],
      swappingIndices: [k],
    };

    arr[k].state = ElementState.DEFAULT;
    j++;
    k++;
  }

  // Mark merged section
  yield {
    array: [...arr],
  };
}
