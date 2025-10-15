import { SortStep, ElementState } from '../types';

export function* countingSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;
  if (n === 0) return;

  // Find max and min values
  let max = arr[0].value;
  let min = arr[0].value;

  for (let i = 0; i < n; i++) {
    arr[i].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [i],
    };

    if (arr[i].value > max) max = arr[i].value;
    if (arr[i].value < min) min = arr[i].value;

    arr[i].state = ElementState.DEFAULT;
  }

  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(n);

  // Count occurrences
  for (let i = 0; i < n; i++) {
    arr[i].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [i],
    };

    count[arr[i].value - min]++;
    arr[i].state = ElementState.DEFAULT;
  }

  // Calculate cumulative count
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    arr[i].state = ElementState.SWAPPING;

    yield {
      array: [...arr],
      swappingIndices: [i],
    };

    output[count[arr[i].value - min] - 1] = arr[i].value;
    count[arr[i].value - min]--;
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

    arr[i].state = ElementState.SORTED;

    yield {
      array: [...arr],
      sortedIndices: [i],
    };
  }

  // Final sorted state
  yield {
    array: [...arr],
    sortedIndices: arr.map((_, i) => i),
  };
}
