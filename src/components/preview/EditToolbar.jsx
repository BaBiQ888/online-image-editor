import { useCallback } from 'react';

const tools = [
  { id: 'eraser', icon: '🧹', label: 'Eraser' },
  { id: 'smooth', icon: '✨', label: 'Smooth Edges' },
  { id: 'reset', icon: '↺', label: 'Reset' },
];

function EditToolbar({ activeTool, onToolChange, onReset, className = '' }) {
  const handleToolClick = useCallback(
    (toolId) => {
      if (toolId === 'reset') {
        onReset();
      } else {
        onToolChange(toolId);
      }
    },
    [onToolChange, onReset]
  );

  return (
    <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${className}`}>
      {tools.map(({ id, icon, label }) => (
        <button
          key={id}
          className={`tool-button ${activeTool === id ? 'tool-button-active' : 'tool-button-inactive'
            }`}
          onClick={() => handleToolClick(id)}
          title={label}
        >
          <span className="text-xl">{icon}</span>
        </button>
      ))}
    </div>
  );
}

export default EditToolbar;
