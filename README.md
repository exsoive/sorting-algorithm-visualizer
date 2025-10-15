# Sorting Algorithm Visualizer

An interactive web-based application that visualizes how different sorting algorithms work in real-time. Built with React, TypeScript, and Tailwind CSS.

![Sorting Algorithm Visualizer](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.14-blue)

## Features

### 13 Sorting Algorithms Implemented

#### Comparison-Based Sorts (10)
- **Bubble Sort** - Simple comparison-based algorithm
- **Selection Sort** - In-place comparison sorting
- **Insertion Sort** - Builds sorted array one element at a time
- **Cocktail Shaker Sort** - Bidirectional bubble sort variant
- **Shell Sort** - Gap-based insertion sort improvement
- **Comb Sort** - Improved bubble sort with shrinking gaps
- **Gnome Sort** - Simple swap-based comparison sort
- **Quick Sort** - Efficient divide-and-conquer with pivot selection
- **Merge Sort** - Stable divide-and-conquer algorithm
- **Heap Sort** - Comparison-based using binary heap

#### Non-Comparison Sorts (3)
- **Counting Sort** - Integer-based counting algorithm
- **Radix Sort** - Digit-by-digit processing
- **Bucket Sort** - Distribution-based sorting

### Visualization Features
- Real-time step-by-step animation
- Color-coded states:
  - **Blue** - Default/Unsorted
  - **Yellow** - Being compared
  - **Red** - Being swapped
  - **Purple** - Pivot element (Quick Sort) / Non-comparison algorithm indicator
  - **Green** - Sorted
- Adjustable array size (5-200 elements)
- Variable speed control (1x-200x)
- Fully functional Play/Pause/Resume controls
- Statistics tracking (comparisons & swaps)
- Categorized algorithm selection (Comparison vs Non-Comparison)
- **Retro 56k modem-style sound effects** synchronized with sorting operations

### Audio Features
- **Web Audio API** integration for real-time sound generation
- **Frequency mapping**: Array values mapped to frequencies (200Hz-1200Hz)
- **Different sound types**:
  - Comparison beeps (sine waves)
  - Swap sounds (square wave swooshes)
  - Pivot selection (lower sawtooth tones)
  - Sorted confirmations (triangle waves)
  - Completion melody (ascending musical scale)
- Toggle ON/OFF control for sound effects

### Educational Content
- Comprehensive algorithm descriptions
- Time complexity analysis (Best, Average, Worst)
- Space complexity information
- Interactive learning experience

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sort-graph
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
sort-graph/
├── src/
│   ├── algorithms/          # 13 sorting algorithm implementations
│   │   ├── bubbleSort.ts
│   │   ├── selectionSort.ts
│   │   ├── insertionSort.ts
│   │   ├── cocktailSort.ts
│   │   ├── shellSort.ts
│   │   ├── combSort.ts
│   │   ├── gnomeSort.ts
│   │   ├── quickSort.ts
│   │   ├── mergeSort.ts
│   │   ├── heapSort.ts
│   │   ├── countingSort.ts
│   │   ├── radixSort.ts
│   │   └── bucketSort.ts
│   ├── components/          # React components
│   │   ├── Visualizer.tsx   # Main visualization component
│   │   └── AlgorithmInfo.tsx # Algorithm information display
│   ├── hooks/
│   │   └── useSortingVisualizer.ts # Custom hook for state management
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── utils/
│   │   ├── algorithmInfo.ts # Algorithm metadata
│   │   └── audioManager.ts  # Web Audio API sound engine
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── postcss.config.js
```

## How It Works

### Generator Functions
Each sorting algorithm is implemented as a JavaScript generator function that yields animation steps:

```typescript
export function* bubbleSort(array: number[]): Generator<SortStep> {
  // Algorithm implementation
  yield {
    array: [...arr],
    comparingIndices: [i, j],
  };
  // More steps...
}
```

### Animation Loop
The application uses `requestAnimationFrame` for smooth animations:
- Each step from the generator is rendered at a controlled speed
- State updates trigger re-renders of the visualization
- Statistics are tracked and updated in real-time

## Technologies Used

- **React 19.2.0** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Vite 7.1.10** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Styling
- **@tailwindcss/postcss** - CSS processing

## Usage

1. **Select an Algorithm** - Choose from 13 different sorting algorithms (10 comparison-based, 3 non-comparison)
2. **Adjust Array Size** - Use the slider to set array size (5-200 elements)
3. **Set Speed** - Control animation speed (1x-200x)
4. **Enable Sound** - Toggle the sound effects ON/OFF for audio feedback
5. **Generate New Array** - Click "New Array" to randomize values
6. **Start Sorting** - Press "Start" to begin the visualization
7. **Pause/Resume** - Pause the animation at any time and resume exactly where you left off
8. **Reset** - Generate a new array and reset statistics

## Algorithm Complexities

### Comparison-Based Sorts

| Algorithm         | Best       | Average    | Worst      | Space    |
|------------------|------------|------------|------------|----------|
| Bubble Sort      | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Selection Sort   | O(n²)      | O(n²)      | O(n²)      | O(1)     |
| Insertion Sort   | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Cocktail Sort    | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Shell Sort       | O(n log n) | O(n^1.5)   | O(n²)      | O(1)     |
| Comb Sort        | O(n log n) | O(n²/2^p)  | O(n²)      | O(1)     |
| Gnome Sort       | O(n)       | O(n²)      | O(n²)      | O(1)     |
| Quick Sort       | O(n log n) | O(n log n) | O(n²)      | O(log n) |
| Merge Sort       | O(n log n) | O(n log n) | O(n log n) | O(n)     |
| Heap Sort        | O(n log n) | O(n log n) | O(n log n) | O(1)     |

### Non-Comparison Sorts

| Algorithm      | Best       | Average    | Worst      | Space    |
|---------------|------------|------------|------------|----------|
| Counting Sort | O(n + k)   | O(n + k)   | O(n + k)   | O(k)     |
| Radix Sort    | O(d·n)     | O(d·n)     | O(d·n)     | O(n + k) |
| Bucket Sort   | O(n + k)   | O(n + k)   | O(n²)      | O(n + k) |

*Where n = number of elements, k = range of input, d = number of digits*

## Future Enhancements

- [ ] Custom array input
- [ ] Step-by-step mode with next/previous buttons
- [ ] Export visualization as GIF/video
- [x] ~~Sound effects synchronized with operations~~ ✅ **Implemented!**
- [ ] Mobile-responsive design improvements
- [ ] Dark/Light theme toggle
- [ ] Comparison mode (run two algorithms side-by-side)
- [ ] Performance benchmarking
- [ ] Volume control slider for audio
- [ ] Different audio themes (retro, modern, musical)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by visualizations from VisuAlgo and Sorting Visualizer projects
- Built as an educational tool for learning sorting algorithms
