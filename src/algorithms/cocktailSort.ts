import { SortStep, ElementState } from '../types';

export function* cocktailSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;

  while (swapped) {
    swapped = false;

    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      arr[i].state = ElementState.COMPARING;
      arr[i + 1].state = ElementState.COMPARING;

      yield {
        array: [...arr],
        comparingIndices: [i, i + 1],
      };

      if (arr[i].value > arr[i + 1].value) {
        arr[i].state = ElementState.SWAPPING;
        arr[i + 1].state = ElementState.SWAPPING;

        yield {
          array: [...arr],
          swappingIndices: [i, i + 1],
        };

        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;

        yield {
          array: [...arr],
        };
      }

      arr[i].state = ElementState.DEFAULT;
      arr[i + 1].state = ElementState.DEFAULT;
    }

    if (!swapped) break;

    arr[end].state = ElementState.SORTED;
    end--;

    yield {
      array: [...arr],
      sortedIndices: [end + 1],
    };

    swapped = false;

    // Backward pass (right to left)
    for (let i = end; i > start; i--) {
      arr[i].state = ElementState.COMPARING;
      arr[i - 1].state = ElementState.COMPARING;

      yield {
        array: [...arr],
        comparingIndices: [i - 1, i],
      };

      if (arr[i].value < arr[i - 1].value) {
        arr[i].state = ElementState.SWAPPING;
        arr[i - 1].state = ElementState.SWAPPING;

        yield {
          array: [...arr],
          swappingIndices: [i - 1, i],
        };

        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        swapped = true;

        yield {
          array: [...arr],
        };
      }

      arr[i].state = ElementState.DEFAULT;
      arr[i - 1].state = ElementState.DEFAULT;
    }

    arr[start].state = ElementState.SORTED;
    start++;

    yield {
      array: [...arr],
      sortedIndices: [start - 1],
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
