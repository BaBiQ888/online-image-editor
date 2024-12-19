import { useState, useEffect } from 'react';

function ImagePositionEditor({ value, onChange }) {
  const [scale, setScale] = useState(value?.scale || 1);
  const [position, setPosition] = useState(value?.position || { x: 0, y: 0 });

  // 同步外部值
  useEffect(() => {
    if (value) {
      setScale(value.scale);
      setPosition(value.position);
    }
  }, [value]);

  const handleScaleChange = (newScale) => {
    setScale(newScale);
    onChange?.({ scale: newScale, position });
  };

  const handlePositionChange = (axis, value) => {
    const newPosition = { ...position, [axis]: value };
    setPosition(newPosition);
    onChange?.({ scale, position: newPosition });
  };

  // 快速预设位置
  const presetPositions = [
    { name: '居中', x: 0, y: 0 },
    { name: '靠左', x: -30, y: 0 },
    { name: '靠右', x: 30, y: 0 },
    { name: '靠上', x: 0, y: -30 },
    { name: '靠下', x: 0, y: 30 },
  ];

  // 快速预设缩放
  const presetScales = [
    { name: '50%', value: 0.5 },
    { name: '75%', value: 0.75 },
    { name: '100%', value: 1 },
    { name: '125%', value: 1.25 },
    { name: '150%', value: 1.5 },
  ];

  return (
    <div className="space-y-6">
      {/* 缩放控制 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">图片缩放</label>
          <span className="text-sm text-gray-500">{Math.round(scale * 100)}%</span>
        </div>
        <div className="flex gap-2 mb-2">
          {presetScales.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleScaleChange(preset.value)}
              className={`px-2 py-1 text-xs rounded ${scale === preset.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          value={scale}
          onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
          className="w-full custom-range"
        />
      </div>

      {/* 位置控制 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">快速定位</label>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {presetPositions.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange?.({ scale, position: { x: preset.x, y: preset.y } })}
              className={`px-2 py-1 text-xs rounded ${position.x === preset.x && position.y === preset.y
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">水平位置</label>
              <span className="text-sm text-gray-500">{position.x}%</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={position.x}
              onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
              className="w-full custom-range"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">垂直位置</label>
              <span className="text-sm text-gray-500">{position.y}%</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={position.y}
              onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
              className="w-full custom-range"
            />
          </div>
        </div>
      </div>

      {/* 重置按钮 */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            const defaultValues = { scale: 1, position: { x: 0, y: 0 } };
            setScale(defaultValues.scale);
            setPosition(defaultValues.position);
            onChange?.(defaultValues);
          }}
          className="px-3 py-1 text-sm rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          重置位置和缩放
        </button>
      </div>
    </div>
  );
}

export default ImagePositionEditor; 