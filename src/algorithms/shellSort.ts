import { SortStep, ElementState } from '../types';

export function* shellSort(array: number[]): Generator<SortStep> {
  const arr = array.map((value) => ({
    value,
    state: ElementState.DEFAULT,
  }));

  const n = arr.length;

  // Start with a large gap and reduce it
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Perform gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      temp.state = ElementState.COMPARING;

      yield {
        array: [...arr],
        comparingIndices: [i],
      };

      let j = i;

      while (j >= gap && arr[j - gap].value > temp.value) {
        arr[j - gap].state = ElementState.COMPARING;
        arr[j].state = ElementState.SWAPPING;

        yield {
          array: [...arr],
          comparingIndices: [j - gap],
          swappingIndices: [j],
        };

        arr[j] = { ...arr[j - gap] };

        yield {
          array: [...arr],
        };

        arr[j].state = ElementState.DEFAULT;
        arr[j - gap].state = ElementState.DEFAULT;
        j -= gap;
      }

      arr[j] = temp;
      arr[j].state = ElementState.DEFAULT;

      yield {
        array: [...arr],
      };
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
