import { GRADIENT_PRESETS, SOLID_PRESETS } from '../../config/backgroundPresets';

function BackgroundPresets({ type, onSelect }) {
  const presets = type === 'gradient' ? GRADIENT_PRESETS : SOLID_PRESETS;

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        预设模板
      </label>
      <div className="grid grid-cols-4 gap-2">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => onSelect(preset)}
            className="p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-full h-12 rounded mb-1"
              style={{
                background:
                  type === 'gradient'
                    ? `linear-gradient(${preset.direction}, ${preset.from}, ${preset.to})`
                    : preset.color,
              }}
            />
            <span className="text-xs text-gray-600">{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BackgroundPresets; 