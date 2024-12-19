import { useCallback, useState } from 'react';
import useImageStore from '../../store/imageStore';

const backgroundTypes = [
  { id: 'transparent', label: 'Transparent', icon: '🌐' },
  { id: 'color', label: 'Solid Color', icon: '🎨' },
  { id: 'image', label: 'Custom Image', icon: '🖼️' },
];

function BackgroundOptions() {
  const [selectedType, setSelectedType] = useState('transparent');
  const [color, setColor] = useState('#ffffff');
  const { setBackground } = useImageStore();

  const handleTypeChange = useCallback(
    (type) => {
      setSelectedType(type);
      if (type === 'transparent') {
        setBackground({ type: 'transparent' });
      } else if (type === 'color') {
        setBackground({ type: 'color', value: color });
      }
    },
    [color, setBackground]
  );

  const handleColorChange = useCallback(
    (e) => {
      const newColor = e.target.value;
      setColor(newColor);
      setBackground({ type: 'color', value: newColor });
    },
    [setBackground]
  );

  const handleImageUpload = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setBackground({ type: 'image', value: event.target.result });
        };
        reader.readAsDataURL(file);
      }
    },
    [setBackground]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium mb-4">Background Options</h3>
      <div className="flex gap-2 mb-4">
        {backgroundTypes.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`tool-button ${
              selectedType === id ? 'tool-button-active' : 'tool-button-inactive'
            }`}
            onClick={() => handleTypeChange(id)}
            title={label}
          >
            <span className="text-xl">{icon}</span>
          </button>
        ))}
      </div>

      {selectedType === 'color' && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-8 h-8 rounded cursor-pointer"
          />
          <span className="text-sm text-gray-600">{color}</span>
        </div>
      )}

      {selectedType === 'image' && (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="bg-image-upload"
          />
          <label
            htmlFor="bg-image-upload"
            className="btn border border-gray-300 hover:bg-gray-100 text-center cursor-pointer"
          >
            Choose Image
          </label>
        </div>
      )}
    </div>
  );
}

export default BackgroundOptions;
