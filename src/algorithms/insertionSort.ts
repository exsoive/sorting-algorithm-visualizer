import { SortStep, ElementState } from '../types';

export function* insertionSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;

  // First element is considered sorted
  arr[0].state = ElementState.SORTED;
  yield {
    array: [...arr],
    sortedIndices: [0],
  };

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    key.state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [i],
    };

    let j = i - 1;

    while (j >= 0 && arr[j].value > key.value) {
      arr[j].state = ElementState.COMPARING;
      arr[j + 1].state = ElementState.SWAPPING;

      yield {
        array: [...arr],
        comparingIndices: [j],
        swappingIndices: [j + 1],
      };

      arr[j + 1] = { ...arr[j] };

      yield {
        array: [...arr],
      };

      arr[j].state = ElementState.SORTED;
      j--;
    }

    arr[j + 1] = key;
    arr[j + 1].state = ElementState.SORTED;

    yield {
      array: [...arr],
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
    };
  }

  // Ensure all elements are marked as sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = ElementState.SORTED;
  }

  yield {
    array: [...arr],
    sortedIndices: arr.map((_, i) => i),
  };
}
