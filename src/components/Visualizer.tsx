import { ArrayElement, ElementState } from '../types';

interface VisualizerProps {
  array: ArrayElement[];
  width?: number;
  height?: number;
}

export default function Visualizer({ array, width = 800, height = 400 }: VisualizerProps) {
  const barWidth = width / array.length;
  const maxValue = Math.max(...array.map((el) => el.value));

  const getBarColor = (state: ElementState): string => {
    switch (state) {
      case ElementState.COMPARING:
        return 'bg-yellow-400';
      case ElementState.SWAPPING:
        return 'bg-red-500';
      case ElementState.SORTED:
        return 'bg-green-500';
      case ElementState.PIVOT:
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div
      className="flex items-end justify-center gap-[1px] bg-gray-800 rounded-lg p-4"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {array.map((element, index) => {
        const barHeight = (element.value / maxValue) * (height - 40);
        return (
          <div
            key={index}
            className={`transition-all duration-100 ${getBarColor(element.state)}`}
            style={{
              width: `${barWidth - 2}px`,
              height: `${barHeight}px`,
            }}
            title={`Value: ${element.value}`}
          />
        );
      })}
    </div>
  );
}
