import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageStore from '../../store/imageStore';
import { validateFile } from '../../utils/fileValidation';
import useUpload from '../../hooks/useUpload';

function ImageUploader() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const { uploadAndProcess } = useUpload();

  const handleFile = useCallback(async (file) => {
    try {
      // 验证文件
      const validation = validateFile(file);
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      setError(null);
      const result = await uploadAndProcess(file);
      if (result.success) {
        navigate('/preview'); // 处理成功后再导航
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Upload error:', error);
    }
  }, [uploadAndProcess, navigate]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-8 transition-all ${isDragging ? 'border-2 border-dashed border-primary-500 bg-primary-50' : ''
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <div className="text-center mb-6">
          <span className="material-icons text-6xl text-primary-500 mb-4">
            cloud_upload
          </span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Upload your image
          </h3>
          <p className="text-gray-600">Drag and drop or click to select</p>
        </div>
        <label
          htmlFor="file-upload"
          className="btn btn-primary cursor-pointer flex items-center group hover:scale-105 transition-transform"
        >
          <span className="material-icons mr-2 group-hover:animate-bounce">
            upload_file
          </span>
          Choose File
        </label>
        <p className="mt-4 text-sm text-gray-500">
          Supports: JPEG, PNG, WebP (max 10MB)
        </p>
        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
