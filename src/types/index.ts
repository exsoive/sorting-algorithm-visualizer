export interface ArrayElement {
  value: number;
  state: ElementState;
}

export enum ElementState {
  DEFAULT = 'default',
  COMPARING = 'comparing',
  SWAPPING = 'swapping',
  SORTED = 'sorted',
  PIVOT = 'pivot',
}

export interface SortStep {
  array: ArrayElement[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  pivotIndex?: number;
}

export type SortAlgorithm =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap'
  | 'cocktail'
  | 'shell'
  | 'comb'
  | 'gnome'
  | 'counting'
  | 'radix'
  | 'bucket';

export interface AlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
}

export interface SortingState {
  array: ArrayElement[];
  isRunning: boolean;
  isPaused: boolean;
  currentStep: number;
  totalSteps: number;
  comparisons: number;
  swaps: number;
  speed: number;
}
