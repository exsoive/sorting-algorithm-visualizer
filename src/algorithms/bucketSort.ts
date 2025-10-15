import { SortStep, ElementState } from '../types';

export function* bucketSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;
  if (n === 0) return;

  // Find max and min
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

  // Create buckets
  const bucketCount = Math.floor(Math.sqrt(n));
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
  const range = (max - min) / bucketCount;

  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    arr[i].state = ElementState.SWAPPING;

    yield {
      array: [...arr],
      swappingIndices: [i],
    };

    let bucketIndex = Math.floor((arr[i].value - min) / range);
    if (bucketIndex >= bucketCount) bucketIndex = bucketCount - 1;

    buckets[bucketIndex].push(arr[i].value);
    arr[i].state = ElementState.DEFAULT;
  }

  // Sort individual buckets and place back
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    // Simple insertion sort for each bucket
    buckets[i].sort((a, b) => a - b);

    for (let j = 0; j < buckets[i].length; j++) {
      arr[index] = {
        value: buckets[i][j],
        state: ElementState.SWAPPING,
      };

      yield {
        array: [...arr],
        swappingIndices: [index],
      };

      arr[index].state = ElementState.SORTED;

      yield {
        array: [...arr],
        sortedIndices: [index],
      };

      index++;
    }
  }

  // Final sorted state
  yield {
    array: [...arr],
    sortedIndices: arr.map((_, i) => i),
  };
}
