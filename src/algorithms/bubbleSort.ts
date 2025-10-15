import { SortStep, ElementState } from '../types';

export function* bubbleSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Comparing elements
      arr[j].state = ElementState.COMPARING;
      arr[j + 1].state = ElementState.COMPARING;

      yield {
        array: [...arr],
        comparingIndices: [j, j + 1],
      };

      // Reset states
      arr[j].state = ElementState.DEFAULT;
      arr[j + 1].state = ElementState.DEFAULT;

      if (arr[j].value > arr[j + 1].value) {
        // Swap elements
        arr[j].state = ElementState.SWAPPING;
        arr[j + 1].state = ElementState.SWAPPING;

        yield {
          array: [...arr],
          swappingIndices: [j, j + 1],
        };

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        swaps++;

        yield {
          array: [...arr],
        };

        arr[j].state = ElementState.DEFAULT;
        arr[j + 1].state = ElementState.DEFAULT;
      }
    }

    // Mark the last element as sorted
    arr[n - i - 1].state = ElementState.SORTED;
    yield {
      array: [...arr],
      sortedIndices: [n - i - 1],
    };

    if (!swapped) break;
  }

  // Mark all remaining elements as sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = ElementState.SORTED;
  }

  yield {
    array: [...arr],
    sortedIndices: arr.map((_, i) => i),
  };
}
