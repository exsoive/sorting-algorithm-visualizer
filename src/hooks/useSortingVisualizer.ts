import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrayElement, SortStep, SortAlgorithm, ElementState } from '../types';
import { bubbleSort } from '../algorithms/bubbleSort';
import { quickSort } from '../algorithms/quickSort';
import { mergeSort } from '../algorithms/mergeSort';
import { selectionSort } from '../algorithms/selectionSort';
import { insertionSort } from '../algorithms/insertionSort';
import { heapSort } from '../algorithms/heapSort';
import { cocktailSort } from '../algorithms/cocktailSort';
import { shellSort } from '../algorithms/shellSort';
import { combSort } from '../algorithms/combSort';
import { gnomeSort } from '../algorithms/gnomeSort';
import { countingSort } from '../algorithms/countingSort';
import { radixSort } from '../algorithms/radixSort';
import { bucketSort } from '../algorithms/bucketSort';
import { audioManager } from '../utils/audioManager';

interface UseSortingVisualizerProps {
  arraySize: number;
  speed: number;
}

export function useSortingVisualizer({ arraySize, speed }: UseSortingVisualizerProps) {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generatorRef = useRef<Generator<SortStep> | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastStepTimeRef = useRef<number>(0);

  // Generate a random array
  const generateArray = useCallback(() => {
    const newArray: ArrayElement[] = Array.from({ length: arraySize }, () => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: ElementState.DEFAULT,
    }));
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
    setIsRunning(false);
    setIsPaused(false);
    generatorRef.current = null;
  }, [arraySize]);

  // Initialize array on mount and when size changes
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  // Get the appropriate sorting algorithm
  const getSortGenerator = (algorithm: SortAlgorithm, arr: number[]) => {
    switch (algorithm) {
      case 'bubble':
        return bubbleSort(arr);
      case 'selection':
        return selectionSort(arr);
      case 'insertion':
        return insertionSort(arr);
      case 'quick':
        return quickSort(arr);
      case 'merge':
        return mergeSort(arr);
      case 'heap':
        return heapSort(arr);
      case 'cocktail':
        return cocktailSort(arr);
      case 'shell':
        return shellSort(arr);
      case 'comb':
        return combSort(arr);
      case 'gnome':
        return gnomeSort(arr);
      case 'counting':
        return countingSort(arr);
      case 'radix':
        return radixSort(arr);
      case 'bucket':
        return bucketSort(arr);
      default:
        return bubbleSort(arr);
    }
  };

  // Animation loop
  const animate = useCallback(
    (timestamp: number) => {
      if (!generatorRef.current || isPaused) {
        return;
      }

      // Control speed - higher speed = shorter delay
      const delay = 1000 / speed;

      if (timestamp - lastStepTimeRef.current >= delay) {
        const result = generatorRef.current.next();

        if (result.done) {
          setIsRunning(false);
          generatorRef.current = null;
          // Play completion sound
          audioManager.playCompletionSound();
          return;
        }

        const step = result.value;
        setArray(step.array);

        // Get max value for audio frequency mapping
        const maxValue = Math.max(...step.array.map(el => el.value));

        if (step.comparingIndices) {
          setComparisons((prev) => prev + 1);

          // Play comparison sound
          if (step.comparingIndices.length >= 2) {
            const val1 = step.array[step.comparingIndices[0]]?.value || 0;
            const val2 = step.array[step.comparingIndices[1]]?.value || 0;
            audioManager.playCompareSound(val1, val2, maxValue);
          }
        }

        if (step.swappingIndices) {
          setSwaps((prev) => prev + 1);

          // Play swap sound
          if (step.swappingIndices.length >= 2) {
            const val1 = step.array[step.swappingIndices[0]]?.value || 0;
            const val2 = step.array[step.swappingIndices[1]]?.value || 0;
            audioManager.playSwapSound(val1, val2, maxValue);
          }
        }

        if (step.pivotIndex !== undefined) {
          // Play pivot sound
          const pivotVal = step.array[step.pivotIndex]?.value || 0;
          audioManager.playPivotSound(pivotVal, maxValue);
        }

        if (step.sortedIndices && step.sortedIndices.length > 0) {
          // Play sorted sound for newly sorted elements
          step.sortedIndices.forEach(idx => {
            const val = step.array[idx]?.value || 0;
            audioManager.playSortedSound(val, maxValue);
          });
        }

        lastStepTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [speed, isPaused]
  );

  // Start sorting
  const startSorting = useCallback(
    (algorithm: SortAlgorithm) => {
      if (isRunning) return;

      const values = array.map((el) => el.value);
      generatorRef.current = getSortGenerator(algorithm, values);

      setIsRunning(true);
      setIsPaused(false);
      setComparisons(0);
      setSwaps(0);
      lastStepTimeRef.current = 0;

      animationRef.current = requestAnimationFrame(animate);
    },
    [array, isRunning, animate]
  );

  // Pause/Resume sorting
  const togglePause = useCallback(() => {
    if (!isRunning) return;

    setIsPaused((prev) => {
      const newPaused = !prev;

      if (newPaused) {
        // Pausing - cancel animation frame
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else {
        // Resuming - restart animation frame
        lastStepTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);
      }

      return newPaused;
    });
  }, [isRunning, animate]);

  // Reset sorting
  const reset = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    generatorRef.current = null;
    setIsRunning(false);
    setIsPaused(false);
    audioManager.stopAllSounds(); // Stop any playing sounds
    generateArray();
  }, [generateArray]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    array,
    isRunning,
    isPaused,
    comparisons,
    swaps,
    startSorting,
    togglePause,
    reset,
    generateArray,
  };
}
