import { SortStep, ElementState } from '../types';

export function* quickSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  yield* quickSortHelper(arr, 0, arr.length - 1);

  // Mark all elements as sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = ElementState.SORTED;
  }
  yield {
    array: [...arr],
    sortedIndices: arr.map((_, i) => i),
  };
}

function* quickSortHelper(
  arr: Array<{ value: number; state: ElementState }>,
  low: number,
  high: number
): Generator<SortStep> {
  if (low < high) {
    const pivotIndex = yield* partition(arr, low, high);
    yield* quickSortHelper(arr, low, pivotIndex - 1);
    yield* quickSortHelper(arr, pivotIndex + 1, high);
  }
}

function* partition(
  arr: Array<{ value: number; state: ElementState }>,
  low: number,
  high: number
): Generator<SortStep, number> {
  const pivot = arr[high].value;
  arr[high].state = ElementState.PIVOT;

  yield {
    array: [...arr],
    pivotIndex: high,
  };

  let i = low - 1;

  for (let j = low; j < high; j++) {
    arr[j].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [j],
      pivotIndex: high,
    };

    if (arr[j].value < pivot) {
      i++;

      if (i !== j) {
        arr[i].state = ElementState.SWAPPING;
        arr[j].state = ElementState.SWAPPING;

        yield {
          array: [...arr],
          swappingIndices: [i, j],
          pivotIndex: high,
        };

        [arr[i], arr[j]] = [arr[j], arr[i]];

        yield {
          array: [...arr],
          pivotIndex: high,
        };

        arr[i].state = ElementState.DEFAULT;
        arr[j].state = ElementState.DEFAULT;
      } else {
        arr[j].state = ElementState.DEFAULT;
      }
    } else {
      arr[j].state = ElementState.DEFAULT;
    }
  }

  // Place pivot in correct position
  i++;
  arr[i].state = ElementState.SWAPPING;
  arr[high].state = ElementState.SWAPPING;

  yield {
    array: [...arr],
    swappingIndices: [i, high],
  };

  [arr[i], arr[high]] = [arr[high], arr[i]];

  arr[i].state = ElementState.SORTED;
  arr[high].state = ElementState.DEFAULT;

  yield {
    array: [...arr],
    sortedIndices: [i],
  };

  return i;
}
