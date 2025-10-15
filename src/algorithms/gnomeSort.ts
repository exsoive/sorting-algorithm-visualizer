import { SortStep, ElementState } from '../types';

export function* gnomeSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;
  let i = 0;

  while (i < n) {
    if (i === 0) {
      i++;
      continue;
    }

    arr[i].state = ElementState.COMPARING;
    arr[i - 1].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [i - 1, i],
    };

    if (arr[i].value >= arr[i - 1].value) {
      arr[i].state = ElementState.DEFAULT;
      arr[i - 1].state = ElementState.DEFAULT;
      i++;
    } else {
      arr[i].state = ElementState.SWAPPING;
      arr[i - 1].state = ElementState.SWAPPING;

      yield {
        array: [...arr],
        swappingIndices: [i - 1, i],
      };

      [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];

      yield {
        array: [...arr],
      };

      arr[i].state = ElementState.DEFAULT;
      arr[i - 1].state = ElementState.DEFAULT;
      i--;
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
