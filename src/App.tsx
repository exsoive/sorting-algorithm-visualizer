import { useState } from 'react';
import Visualizer from './components/Visualizer';
import AlgorithmInfo from './components/AlgorithmInfo';
import ThemeToggle from './components/ThemeToggle';
import { useSortingVisualizer } from './hooks/useSortingVisualizer';
import { SortAlgorithm } from './types';
import { audioManager } from './utils/audioManager';

function App() {
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(10);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortAlgorithm>('bubble');
  const [soundEnabled, setSoundEnabled] = useState(false);

  const {
    array,
    isRunning,
    isPaused,
    comparisons,
    swaps,
    startSorting,
    togglePause,
    reset,
    generateArray,
  } = useSortingVisualizer({ arraySize, speed });

  const handleStart = () => {
    startSorting(selectedAlgorithm);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    audioManager.setEnabled(newState);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Sorting Algorithm Visualizer
        </h1>

        {/* Action Buttons - Moved to top */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex gap-4">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start
            </button>
            <button
              onClick={togglePause}
              disabled={!isRunning}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={reset}
              className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Reset
            </button>
            <button
              onClick={generateArray}
              disabled={isRunning}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium transition-colors"
            >
              New Array
            </button>
          </div>
        </div>

        {/* Visualizer */}
        <div className="flex justify-center mb-8">
          <Visualizer array={array} width={900} height={400} />
        </div>

        {/* Controls */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Algorithm Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg dark:shadow-none">
            <label className="block text-sm font-medium mb-4 text-gray-900 dark:text-white">Select Algorithm</label>

            {/* Comparison Sorts */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Comparison-Based Sorts</p>
              <div className="grid grid-cols-3 gap-2">
                {(['bubble', 'selection', 'insertion', 'cocktail', 'shell', 'comb', 'gnome', 'quick', 'merge', 'heap'] as SortAlgorithm[]).map((algo) => (
                  <button
                    key={algo}
                    onClick={() => setSelectedAlgorithm(algo)}
                    disabled={isRunning}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                      selectedAlgorithm === algo
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {algo.charAt(0).toUpperCase() + algo.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Non-Comparison Sorts */}
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Non-Comparison Sorts</p>
              <div className="grid grid-cols-3 gap-2">
                {(['counting', 'radix', 'bucket'] as SortAlgorithm[]).map((algo) => (
                  <button
                    key={algo}
                    onClick={() => setSelectedAlgorithm(algo)}
                    disabled={isRunning}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                      selectedAlgorithm === algo
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {algo.charAt(0).toUpperCase() + algo.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Algorithm Information */}
          <AlgorithmInfo algorithm={selectedAlgorithm} />

          {/* Array Size */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg dark:shadow-none">
            <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
              Array Size: {arraySize}
            </label>
            <input
              type="range"
              min="5"
              max="200"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isRunning}
              className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Speed Control */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg dark:shadow-none">
            <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-white">
              Speed: {speed}x
            </label>
            <input
              type="range"
              min="1"
              max="200"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Sound Control */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg dark:shadow-none">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Sound Effects</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Retro modem-style audio synchronized with sorting</p>
              </div>
              <button
                onClick={toggleSound}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  soundEnabled
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}
              >
                {soundEnabled ? '🔊 ON' : '🔇 OFF'}
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg dark:shadow-none">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Comparisons</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{comparisons}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Swaps</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{swaps}</p>
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg dark:shadow-none">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Color Legend</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-900 dark:text-white">Default</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                <span className="text-sm text-gray-900 dark:text-white">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-900 dark:text-white">Swapping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
                <span className="text-sm text-gray-900 dark:text-white">Pivot</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-900 dark:text-white">Sorted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
