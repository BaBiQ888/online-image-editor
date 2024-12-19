import { useState, useRef, useEffect } from 'react';

function AnimationPathEditor({ path, onChange }) {
  const [points, setPoints] = useState(path || []);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const svgRef = useRef(null);

  // 转换坐标
  const transformPoint = (e) => {
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x: Math.round(x), y: Math.round(y) };
  };

  // 添加点
  const handleClick = (e) => {
    if (isDragging) return;
    const point = transformPoint(e);
    const newPoints = [...points, point];
    setPoints(newPoints);
    onChange?.(newPoints);
  };

  // 开始拖动
  const handlePointMouseDown = (index, e) => {
    e.stopPropagation();
    setIsDragging(true);
    setSelectedPoint(index);
  };

  // 拖动点
  const handleMouseMove = (e) => {
    if (!isDragging || selectedPoint === null) return;
    const point = transformPoint(e);
    const newPoints = [...points];
    newPoints[selectedPoint] = point;
    setPoints(newPoints);
    onChange?.(newPoints);
  };

  // 结束拖动
  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedPoint(null);
  };

  // 删除点
  const handlePointDoubleClick = (index, e) => {
    e.stopPropagation();
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints);
    onChange?.(newPoints);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="w-full aspect-video bg-gray-50 rounded-lg cursor-crosshair"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* 网格 */}
      <defs>
        <pattern
          id="grid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* 路径 */}
      {points.length > 1 && (
        <path
          d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* 控制点 */}
      {points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            fill={selectedPoint === index ? '#2563eb' : '#3b82f6'}
            stroke="white"
            strokeWidth="2"
            onMouseDown={(e) => handlePointMouseDown(index, e)}
            onDoubleClick={(e) => handlePointDoubleClick(index, e)}
            className="cursor-move hover:r-5 transition-all"
          />
          {selectedPoint === index && (
            <text
              x={point.x + 10}
              y={point.y - 10}
              className="text-xs fill-gray-500"
            >
              {`x: ${point.x}, y: ${point.y}`}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

export default AnimationPathEditor; 