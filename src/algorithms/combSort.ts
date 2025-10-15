import { SortStep, ElementState } from '../types';

export function* combSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    // Update gap
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    // Compare elements with current gap
    for (let i = 0; i + gap < n; i++) {
      arr[i].state = ElementState.COMPARING;
      arr[i + gap].state = ElementState.COMPARING;

      yield {
        array: [...arr],
        comparingIndices: [i, i + gap],
      };

      if (arr[i].value > arr[i + gap].value) {
        arr[i].state = ElementState.SWAPPING;
        arr[i + gap].state = ElementState.SWAPPING;

        yield {
          array: [...arr],
          swappingIndices: [i, i + gap],
        };

        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        sorted = false;

        yield {
          array: [...arr],
        };
      }

      arr[i].state = ElementState.DEFAULT;
      arr[i + gap].state = ElementState.DEFAULT;
    }
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
