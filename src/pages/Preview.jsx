import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useImageStore from '../store/imageStore';
import { downloadFile } from '../utils/downloadUtils';
import { getBackgroundStyle } from '../utils/backgroundUtils';
import StepIndicator from '../components/preview/StepIndicator';
import BackgroundEditor from '../components/editor/BackgroundEditor';
import ImagePositionEditor from '../components/editor/ImagePositionEditor';

function Preview() {
  const navigate = useNavigate();
  const {
    originalImage,
    processedImage,
    maskImage,
    processingStatus,
    setBackground,
    exportWithBackground,
    addToHistory,
    history,
  } = useImageStore();
  const { isProcessing } = processingStatus;
  const [isExporting, setIsExporting] = useState(false);

  // 使用本地状态管理背景设置
  const [backgroundState, setBackgroundState] = useState({
    type: 'transparent',
    color: '#ffffff',
    opacity: 1,
    gradient: {
      from: '#FF512F',
      to: '#F09819',
      direction: '45deg',
    },
  });

  const [imageSettings, setImageSettings] = useState({
    scale: 1,
    position: { x: 0, y: 0 },
  });

  // 处理背景变化
  const handleBackgroundChange = (newBackground) => {
    setBackgroundState(newBackground);
    setBackground(newBackground);

    // 更新历史记录中的背景设置
    const currentRecord = history[0];
    if (currentRecord) {
      addToHistory({
        ...currentRecord,
        background: newBackground,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // 处理下载
  const handleDownload = async () => {
    if (!processedImage) return;

    try {
      setIsExporting(true);
      if (backgroundState.type !== 'transparent') {
        // 导出带背景的图片
        const result = await exportWithBackground(
          processedImage,
          backgroundState,
          imageSettings  // 添加 imageSettings 参数
        );
        await downloadFile(result.url, result.filename);
        // 清理临时 URL
        URL.revokeObjectURL(result.url);
      } else {
        // 直接下载原图
        await downloadFile(processedImage, `image_${Date.now()}.png`);
      }
    } catch (error) {
      console.error('Export failed:', error);
      // 可以添加错误提示
    } finally {
      setIsExporting(false);
    }
  };

  // 处理图片设置变化
  const handleImageSettingsChange = (newSettings) => {
    setImageSettings(newSettings);
  };

  useEffect(() => {
    if (!originalImage) {
      navigate('/');
    }
  }, [originalImage, navigate]);

  const getAnimationStyle = () => {
    const { animation } = backgroundState;
    if (!animation || animation.type === 'none') return {};

    if (animation.combined?.length > 0) {
      // 组合动画
      const animations = animation.combined.map(anim => {
        const { type, config = {} } = anim;
        return `${type} ${config.duration || 2}s ${config.timing || 'ease-in-out'} ${config.delay || 0}s ${config.iterationCount || 'infinite'}`;
      });
      return {
        animation: animations.join(', '),
        animationComposition: 'add',
      };
    } else {
      // 单个动画
      const { type, config = {} } = animation;
      return {
        animation: `${type} ${config.duration || 2}s ${config.timing || 'ease-in-out'} ${config.delay || 0}s ${config.iterationCount || 'infinite'}`,
      };
    }
  };

  const getImageStyle = () => {
    const { scale, position } = imageSettings;
    const { animation } = backgroundState;

    const transform = `
      translate(${position.x}%, ${position.y}%)
      scale(${scale})
    `;

    if (!animation || animation.type === 'none') {
      return { transform };
    }

    if (animation.combined?.length > 0) {
      const animations = animation.combined.map(anim => {
        const { type, config = {} } = anim;
        return `${type} ${config.duration || 2}s ${config.timing || 'ease-in-out'} ${config.delay || 0}s ${config.iterationCount || 'infinite'}`;
      });
      return {
        transform,
        animation: animations.join(', '),
        animationComposition: 'add',
      };
    } else {
      const { type, config = {} } = animation;
      return {
        transform,
        animation: `${type} ${config.duration || 2}s ${config.timing || 'ease-in-out'} ${config.delay || 0}s ${config.iterationCount || 'infinite'}`,
      };
    }
  };

  if (!originalImage) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <span className="material-icons mr-2">arrow_back</span>
            返回首页
          </button>
          <StepIndicator currentStep={2} />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* 三张图片展示区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 原图 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">原始图片</h2>
            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* 处理结果 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">处理结果</h2>
            <div className="aspect-video bg-checkerboard rounded-lg overflow-hidden relative">
              <div
                className="absolute inset-0"
                style={getBackgroundStyle(backgroundState)}
              />
              {processedImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="max-w-full max-h-full object-contain animate-subject"
                    style={getImageStyle()}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 遮罩图 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">遮罩预览</h2>
            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden">
              {maskImage ? (
                <img
                  src={maskImage}
                  alt="Mask"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {isProcessing ? '处理中...' : '等待处理'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 背景设置 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">背景设置</h3>
          <BackgroundEditor
            background={backgroundState}
            onChange={handleBackgroundChange}
          />
        </div>

        {/* 图片设置 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">图片设置</h3>
          <ImagePositionEditor
            value={imageSettings}
            onChange={handleImageSettingsChange}
          />
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDownload}
            className="btn bg-primary-500 text-white hover:bg-primary-600"
            disabled={!processedImage || isProcessing || isExporting}
          >
            <span className="material-icons mr-2">
              {isExporting ? 'hourglass_empty' : 'download'}
            </span>
            {isExporting ? '导出中...' : '下载结果'}
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <span className="material-icons mr-2">add_photo_alternate</span>
            处理新图片
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
