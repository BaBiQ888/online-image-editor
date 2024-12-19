import useImageStore from '../../store/imageStore';
import { GRADIENT_TYPES } from '../../config/backgroundPresets';
import { ANIMATION_PRESETS } from '../../config/animations';

function ProcessedImagePreview() {
  const { processedImage, background } = useImageStore();

  // 渐变样式生成
  const getGradientStyle = () => {
    const { gradientType, from, to, direction, shape, position } = background;
    switch (gradientType) {
      case GRADIENT_TYPES.RADIAL:
        return `radial-gradient(${shape || 'circle'} at ${position || 'center'}, ${from}, ${to})`;
      case GRADIENT_TYPES.CONIC:
        return `conic-gradient(from ${direction || '0deg'}, ${from}, ${to})`;
      case GRADIENT_TYPES.LINEAR:
      default:
        return `linear-gradient(${direction || '0deg'}, ${from}, ${to})`;
    }
  };

  // 动画样式生成
  const getAnimationStyle = () => {
    const { animation = 'none', animationSpeed = 1, animationCustom } = background;
    const animationPreset = ANIMATION_PRESETS.find((preset) => preset.type === animation);

    // 组合动画
    if (background.useComposed && background.combinedAnimations?.length > 0) {
      return {
        animation: background.combinedAnimations.join(', '),
        animationComposition: 'add',
      };
    }

    // 预设动画
    if (!animationPreset?.css?.animation) return {};

    const [name] = animationPreset.css.animation.split(' ');
    const {
      duration = 2,
      timing = 'ease-in-out',
      delay = 0,
      iterationCount = 'infinite',
    } = animationCustom || {};

    return {
      animation: [
        name,
        `${duration / animationSpeed}s`,
        timing,
        background.animationDirection || 'normal',
        background.animationPaused ? 'paused' : 'running',
        iterationCount,
        `${delay}s`,
      ].join(' '),
      willChange: 'transform',
    };
  };

  // 背景样式生成
  const getBackgroundStyle = () => {
    const { blur, opacity, scale, position, blendMode, type } = background;

    // 基础样式
    const baseStyle = {
      filter: blur ? `blur(${blur}px)` : undefined,
      opacity: opacity || 1,
      mixBlendMode: blendMode || 'normal',
      ...getAnimationStyle(),
    };

    // 背景类型样式
    const backgroundStyle = (() => {
      switch (type) {
        case 'solid':
          return { backgroundColor: background.color };
        case 'gradient':
          return { background: getGradientStyle() };
        case 'image':
          return {
            backgroundImage: `url(${background.url})`,
            backgroundSize: scale ? `${scale * 100}%` : 'cover',
            backgroundPosition: position ? `${position.x}% ${position.y}%` : 'center',
          };
        default:
          return {
            backgroundImage: 'url("/checkerboard.png")',
            backgroundSize: '20px 20px',
          };
      }
    })();

    return {
      ...baseStyle,
      ...backgroundStyle,
    };
  };

  // 图片样式生成
  const getImageStyle = () => ({
    mixBlendMode: background.blendMode || 'normal',
    ...getAnimationStyle(),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">处理结果</h2>
      </div>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <div className="absolute inset-0 rounded-xl overflow-hidden bg-checkerboard">
          {/* 背景层 - 不应用动画 */}
          <div
            className="absolute inset-0 transition-all duration-300"
            style={{
              ...getBackgroundStyle(),
              animation: undefined, // 移除背景动画
            }}
          />
          {/* 图片层 - 只对人像应用动画 */}
          {processedImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={processedImage}
                alt="Processed"
                className="max-w-full max-h-full object-contain"
                style={getImageStyle()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessedImagePreview; 