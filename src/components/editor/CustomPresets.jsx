import { useState } from 'react';
import useImageStore from '../../store/imageStore';

function CustomPresets() {
  const [isOpen, setIsOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const { background, customPresets, addCustomPreset, deleteCustomPreset, applyPreset } =
    useImageStore();

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;

    addCustomPreset({
      name: newPresetName,
      type: background.type,
      settings: {
        ...background,
      },
    });
    setNewPresetName('');
    setIsOpen(false);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700">自定义预设</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary-600 hover:text-primary-700 text-sm"
        >
          保存当前设置
        </button>
      </div>

      {isOpen && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <input
            type="text"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            placeholder="预设名称"
            className="w-full rounded-lg border-gray-300 mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-700"
            >
              取消
            </button>
            <button
              onClick={handleSavePreset}
              className="text-primary-600 hover:text-primary-700"
            >
              保存
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {customPresets.map((preset) => (
          <div
            key={preset.id}
            className="bg-white border rounded-lg p-2 flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{preset.name}</span>
              <button
                onClick={() => deleteCustomPreset(preset.id)}
                className="text-red-500 hover:text-red-600"
              >
                <span className="material-icons text-sm">delete</span>
              </button>
            </div>
            <button
              onClick={() => applyPreset(preset)}
              className="bg-gray-50 rounded h-12 hover:bg-gray-100 transition-colors"
              style={{
                background:
                  preset.type === 'gradient'
                    ? preset.settings.background
                    : preset.settings.color,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomPresets; 