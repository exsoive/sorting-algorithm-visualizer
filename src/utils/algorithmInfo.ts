import { AlgorithmInfo, SortAlgorithm } from '../types';

export const algorithmData: Record<SortAlgorithm, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. It repeatedly selects the smallest element from the unsorted portion and moves it to the end of the sorted portion.',
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place it belongs in the sorted list, and inserts it there.',
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    description:
      'Quick Sort is a divide-and-conquer algorithm. It works by selecting a pivot element and partitioning the array around it, such that elements smaller than the pivot are before it and elements greater are after it. Then it recursively sorts the sub-arrays.',
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    description:
      'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. It guarantees O(n log n) time complexity in all cases.',
  },
  heap: {
    name: 'Heap Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Heap Sort uses a binary heap data structure. It first builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and reconstructs the heap until all elements are sorted.',
  },
  cocktail: {
    name: 'Cocktail Shaker Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Cocktail Shaker Sort is a bidirectional variant of Bubble Sort. It traverses the list in both directions alternately, which can improve performance on certain types of input data by eliminating turtles (small values near the end).',
  },
  shell: {
    name: 'Shell Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n^1.5)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Shell Sort improves upon Insertion Sort by comparing elements separated by a gap. The gap is gradually reduced until it becomes 1, at which point the algorithm becomes a standard insertion sort. This approach is more efficient for larger datasets.',
  },
  comb: {
    name: 'Comb Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n²/2^p)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Comb Sort improves on Bubble Sort by using a gap of size more than 1. The gap starts with a large value and shrinks by a factor of 1.3 in every iteration until it reaches 1. This helps eliminate small values at the end of the list (turtles).',
  },
  gnome: {
    name: 'Gnome Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description:
      'Gnome Sort is similar to Insertion Sort but moves an element to its proper place by a series of swaps. It is conceptually simple, resembling how a gnome sorts a line of flower pots, but is inefficient for large datasets.',
  },
  counting: {
    name: 'Counting Sort',
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n + k)',
    },
    spaceComplexity: 'O(k)',
    description:
      'Counting Sort is a non-comparison-based algorithm that counts the occurrences of each unique element. It works well when the range of input values (k) is not significantly larger than the number of elements (n). Efficient for integers with a limited range.',
  },
  radix: {
    name: 'Radix Sort',
    timeComplexity: {
      best: 'O(d·n)',
      average: 'O(d·n)',
      worst: 'O(d·n)',
    },
    spaceComplexity: 'O(n + k)',
    description:
      'Radix Sort is a non-comparison-based algorithm that sorts numbers by processing individual digits. It processes digits from least significant to most significant (or vice versa) using a stable sub-sort like Counting Sort. Very efficient for integers.',
  },
  bucket: {
    name: 'Bucket Sort',
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(n + k)',
    description:
      'Bucket Sort distributes elements into buckets, sorts each bucket individually, and then concatenates them. It works well when input is uniformly distributed over a range. Performance depends on the distribution of input and the sorting algorithm used for individual buckets.',
  },
};
