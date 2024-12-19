import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFile, ACCEPTED_TYPES } from '../../utils/fileValidation';
import useUpload from '../../hooks/useUpload';

function Uploader() {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { uploadImage, isLoading } = useUpload();

  const handleFile = useCallback(
    async (file) => {
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      setError(null);
      try {
        await uploadImage(file);
        navigate('/preview');
      } catch (err) {
        setError('Failed to upload image. Please try again.');
      }
    },
    [uploadImage, navigate]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors
          ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-500'
          }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={handleChange}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
        />

        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
          <div className="text-6xl mb-4">📁</div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              {isLoading ? 'Uploading...' : 'Drop your image here'}
            </p>
            <p className="mt-2 text-sm text-gray-500">or click to select a file</p>
            <p className="mt-1 text-xs text-gray-400">Supports: JPEG, PNG (max 5MB)</p>
          </div>
        </label>

        {error && <div className="mt-4 text-center text-red-500 text-sm">{error}</div>}
      </div>
    </div>
  );
}

export default Uploader;
