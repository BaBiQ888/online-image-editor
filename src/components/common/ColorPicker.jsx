import { useState, useRef, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useClickAway } from '../../hooks/useClickAway';

function ColorPicker({ color, onChange, presets = [], className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef(null);
  const trigger = useRef(null);

  // 点击外部关闭
  useClickAway([popover, trigger], () => setIsOpen(false));

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      {/* 颜色预览按钮 */}
      <button
        ref={trigger}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-primary-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="w-6 h-6 rounded-md border border-gray-200"
          style={{ backgroundColor: color }}
        />
        <span className="flex-1 text-left text-sm text-gray-700">
          {color.toUpperCase()}
        </span>
        <span className="material-icons text-gray-400 text-sm">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* 颜色选择面板 */}
      {isOpen && (
        <div
          ref={popover}
          className="absolute z-10 top-full left-0 mt-2 bg-white rounded-xl shadow-xl p-4 w-64"
        >
          {/* 颜色选择器 */}
          <HexColorPicker
            color={color}
            onChange={onChange}
            className="mb-4"
          />

          {/* 颜色输入框 */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-500 text-sm">#</span>
            <HexColorInput
              color={color}
              onChange={onChange}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              prefixed
            />
          </div>

          {/* 预设颜色 */}
          {presets.length > 0 && (
            <>
              <div className="text-xs text-gray-500 mb-2">预设颜色</div>
              <div className="grid grid-cols-5 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${color.toLowerCase() === preset.toLowerCase()
                      ? 'border-primary-500 scale-110 shadow-md'
                      : 'border-transparent hover:scale-110'
                      }`}
                    style={{ backgroundColor: preset }}
                    onClick={() => {
                      onChange(preset);
                      setIsOpen(false);
                    }}
                    title={preset}
                  />
                ))}
              </div>
            </>
          )}

          {/* 透明度控制 */}
          <div className="mt-4">
            <div className="text-xs text-gray-500 mb-2">透明度</div>
            <div className="relative h-4 bg-checkerboard rounded overflow-hidden">
              <div
                className="absolute inset-0 rounded"
                style={{
                  background: `linear-gradient(to right, transparent, ${color})`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorPicker; 