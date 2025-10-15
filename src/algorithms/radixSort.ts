import { SortStep, ElementState } from '../types';

export function* radixSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;
  if (n === 0) return;

  // Find maximum number to know number of digits
  let max = arr[0].value;
  for (let i = 0; i < n; i++) {
    arr[i].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [i],
    };

    if (arr[i].value > max) max = arr[i].value;
    arr[i].state = ElementState.DEFAULT;
  }

  // Perform counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    yield* countingSortByDigit(arr, n, exp);
  }

  // Mark all elements as sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = ElementState.SORTED;
  }

  yield {
    array: [...arr],
    sortedIndices: arr.map((_, i) => i),
  };
}

function* countingSortByDigit(
  arr: Array<{ value: number; state: ElementState }>,
  n: number,
  exp: number
): Generator<SortStep> {
  const output = new Array(n);
  const count = new Array(10).fill(0);

  // Count occurrences of digits
  for (let i = 0; i < n; i++) {
    arr[i].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [i],
    };

    const digit = Math.floor(arr[i].value / exp) % 10;
    count[digit]++;
    arr[i].state = ElementState.DEFAULT;
  }

  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    arr[i].state = ElementState.SWAPPING;

    yield {
      array: [...arr],
      swappingIndices: [i],
    };

    const digit = Math.floor(arr[i].value / exp) % 10;
    output[count[digit] - 1] = arr[i].value;
    count[digit]--;
    arr[i].state = ElementState.DEFAULT;
  }

  // Copy output back to arr
  for (let i = 0; i < n; i++) {
    arr[i] = {
      value: output[i],
      state: ElementState.SWAPPING,
    };

    yield {
      array: [...arr],
      swappingIndices: [i],
    };

    arr[i].state = ElementState.DEFAULT;
  }

  yield {
    array: [...arr],
  };
}
