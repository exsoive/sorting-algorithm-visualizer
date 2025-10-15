import { SortStep, ElementState } from '../types';

export function* selectionSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    arr[minIndex].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [minIndex],
    };

    for (let j = i + 1; j < n; j++) {
      arr[j].state = ElementState.COMPARING;

      yield {
        array: [...arr],
        comparingIndices: [minIndex, j],
      };

      if (arr[j].value < arr[minIndex].value) {
        arr[minIndex].state = ElementState.DEFAULT;
        minIndex = j;
        arr[minIndex].state = ElementState.COMPARING;
      } else {
        arr[j].state = ElementState.DEFAULT;
      }
    }

    if (minIndex !== i) {
      arr[i].state = ElementState.SWAPPING;
      arr[minIndex].state = ElementState.SWAPPING;

      yield {
        array: [...arr],
        swappingIndices: [i, minIndex],
      };

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      yield {
        array: [...arr],
      };
    }

    arr[i].state = ElementState.SORTED;
    if (minIndex !== i) {
      arr[minIndex].state = ElementState.DEFAULT;
    }

    yield {
      array: [...arr],
      sortedIndices: [i],
    };
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
