import { SortStep, ElementState } from '../types';

export function* heapSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    arr[0].state = ElementState.SWAPPING;
    arr[i].state = ElementState.SWAPPING;

    yield {
      array: [...arr],
      swappingIndices: [0, i],
    };

    [arr[0], arr[i]] = [arr[i], arr[0]];

    yield {
      array: [...arr],
    };

    arr[i].state = ElementState.SORTED;
    arr[0].state = ElementState.DEFAULT;

    yield {
      array: [...arr],
      sortedIndices: [i],
    };

    // Heapify the reduced heap
    yield* heapify(arr, i, 0);
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

function* heapify(
  arr: Array<{ value: number; state: ElementState }>,
  n: number,
  i: number
): Generator<SortStep> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  arr[i].state = ElementState.COMPARING;

  yield {
    array: [...arr],
    comparingIndices: [i],
  };

  if (left < n) {
    arr[left].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [i, left],
    };

    if (arr[left].value > arr[largest].value) {
      largest = left;
    }

    if (left !== largest) {
      arr[left].state = ElementState.DEFAULT;
    }
  }

  if (right < n) {
    arr[right].state = ElementState.COMPARING;

    yield {
      array: [...arr],
      comparingIndices: [largest, right],
    };

    if (arr[right].value > arr[largest].value) {
      if (largest !== i) {
        arr[largest].state = ElementState.DEFAULT;
      }
      largest = right;
    }

    if (right !== largest) {
      arr[right].state = ElementState.DEFAULT;
    }
  }

  if (largest !== i) {
    arr[i].state = ElementState.SWAPPING;
    arr[largest].state = ElementState.SWAPPING;

    yield {
      array: [...arr],
      swappingIndices: [i, largest],
    };

    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    yield {
      array: [...arr],
    };

    arr[i].state = ElementState.DEFAULT;
    arr[largest].state = ElementState.DEFAULT;

    yield* heapify(arr, n, largest);
  } else {
    arr[i].state = ElementState.DEFAULT;
  }
}
