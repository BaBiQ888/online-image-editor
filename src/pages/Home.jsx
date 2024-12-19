import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/home/FeatureCard';
import DemoShowcase from '../components/home/DemoShowcase';
import StepGuide from '../components/home/StepGuide';

const FEATURES = [
  {
    icon: 'auto_fix_high',
    title: '智能抠图',
    description: '使用先进的AI技术，一键去除图片背景，效果自然精准。',
    color: 'blue',
  },
  {
    icon: 'palette',
    title: '丰富背景',
    description: '支持纯色、渐变、图片等多种背景类型，打造完美效果。',
    color: 'purple',
  },
  {
    icon: 'animation',
    title: '动画效果',
    description: '内置多种动画效果，让图片富有生命力，支持自定义和组合。',
    color: 'green',
  },
  {
    icon: 'tune',
    title: '细节调整',
    description: '提供缩放、位置、模糊度等细节调整，完美控制每个细节。',
    color: 'orange',
  },
  {
    icon: 'gif',
    title: 'GIF导出',
    description: '支持将动画效果导出为GIF格式，方便分享和使用。',
    color: 'pink',
  },
  {
    icon: 'history',
    title: '历史记录',
    description: '自动保存处理记录，随时查看和重用之前的作品。',
    color: 'indigo',
  },
];

const STEPS = [
  {
    number: '01',
    title: '上传图片',
    description: '支持多种格式，快速上传您需要处理的图片',
    icon: 'upload_file',
  },
  {
    number: '02',
    title: '智能抠图',
    description: 'AI自动识别主体，精准去除背景',
    icon: 'auto_fix_high',
  },
  {
    number: '03',
    title: '自由编辑',
    description: '添加背景、应用动画，打造完美效果',
    icon: 'edit',
  },
  {
    number: '04',
    title: '导出分享',
    description: '支持多种格式导出，方便分享使用',
    icon: 'share',
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部横幅 */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-gradient-animate text-white relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          {/* 左上装饰 */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl transform rotate-12 animate-pulse" />
          {/* 右下装 */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl transform -rotate-12 animate-pulse" />
          {/* 动态圆点装饰 */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative">
          <div className="text-center">
            {/* 标题部分 */}
            <div className="relative inline-block animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                AI智能抠图工具
              </h1>
              {/* 标题装饰 */}
              <div className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-spin-slow">
                <span className="material-icons">auto_awesome</span>
              </div>
            </div>

            {/* 副标题 */}
            <p className="text-lg sm:text-xl text-primary-100 mb-12 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '200ms' }}>
              一键去除背景，添加动画效果，让图片更生动
              <br />
              <span className="text-sm opacity-75">支持批量处理，快速导出</span>
            </p>

            {/* 上传按钮 */}
            <div className="animate-fade-in space-y-4" style={{ animationDelay: '400ms' }}>
              <button
                onClick={() => navigate('/upload')}
                className="inline-flex btn bg-white text-primary-600 hover:bg-primary-50 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-4"
              >
                <span className="flex items-center text-lg">
                  <span className="material-icons text-2xl mr-2 group-hover:scale-110 transition-transform">
                    rocket_launch
                  </span>
                  立即使用
                </span>
              </button>
              {/* 支持的格式提示 */}
              <div className="text-primary-200 text-sm">
                支持 JPG、PNG、WEBP 等常见图片格式
              </div>
            </div>

            {/* 特点标签 */}
            <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
              {[
                { icon: 'bolt', text: '快速处理' },
                { icon: 'auto_awesome', text: '智能识别' },
                { icon: 'high_quality', text: '高清输出' },
                { icon: 'cloud_done', text: '免费使用' },
              ].map((item, index) => (
                <div
                  key={item.text}
                  className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2 backdrop-blur-sm"
                >
                  <span className="material-icons text-sm mr-1">
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 使用步骤 */}
      <StepGuide steps={STEPS} />

      {/* 示例展示 */}
      <DemoShowcase />

      {/* 功能特点 */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          强大功能，简单操作
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          我们提供丰富的功能和直观的界面，让图片处理变得轻松愉快
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 100}
            />
          ))}
        </div>
      </div>

      {/* 使用场景 */}
      <div className="bg-gray-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            广泛的应用场景
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            无论是电商产品、社交媒体还是个人创作，都能轻松应对
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
              <span className="material-icons text-primary-400 text-3xl mb-4">
                shopping_bag
              </span>
              <h3 className="text-lg font-medium mb-2">电商产品</h3>
              <p className="text-gray-400">
                快速制作产品主图，添加吸引眼球的动画效果，提升转化率
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
              <span className="material-icons text-primary-400 text-3xl mb-4">
                public
              </span>
              <h3 className="text-lg font-medium mb-2">社交媒体</h3>
              <p className="text-gray-400">
                制作精美的社交媒体图片和动图，提升内容吸引力
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
              <span className="material-icons text-primary-400 text-3xl mb-4">
                brush
              </span>
              <h3 className="text-lg font-medium mb-2">个人创作</h3>
              <p className="text-gray-400">
                轻松创作个性化图片，展现独特创意
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 AI智能抠图工具. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
