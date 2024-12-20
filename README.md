## 技术栈

- React 18
- Vite 4.x
- Zustand (状态管理)
- Tailwind CSS (样式)
- React Router DOM (路由)

## 使用说明

1. **上传图片**
   - 支持拖拽上传
   - 支持点击上传
   - 支持常见图片格式（PNG/JPG/JPEG）

2. **背景设置**
   - 选择背景类型（透明/纯色/渐变）
   - 调整背景透明度
   - 设置渐变方向和颜色
   - 添加动画效果

3. **图片调整**
   - 使用滑块调整缩放比例（50%-200%）
   - 使用预设按钮快速定位
   - 微调水平和垂直位置
   - 实时预览调整效果

4. **导出图片**
   - 选择导出格式（PNG/GIF）
   - 自动优化图片尺寸
   - 点击下载按钮保存结果

## 开发说明

### 环境要求
- Node.js >= 14
- npm >= 6
- 现代浏览器（支持 ES6+）

### 配置说明
项目使用 Vite 作为构建工具，主要配置在 `vite.config.js` 中：
- 开发服务器端口：5173
- 自动打开浏览器
- 公共资源目录：public
- 构建优化配置

### 状态管理
使用 Zustand 进行状态管理，主要包含：
- 图片状态（原图/处理后/遮罩）
- 背景设置（类型/颜色/渐变/动画）
- 图片位置和缩放设置
- 处理状态和历史记录

### 开发命令
```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 生产环境构建
npm run build

# 预览生产构建
npm run preview

# 代码格式化
npm run format
```

## 注意事项

1. 图片处理过程中请勿刷新页面
2. 建议使用现代浏览器以获得最佳体验
3. 大尺寸图片会自动缩放至合适大小
4. 导出 GIF 时可能需要较长处理时间
5. 建议使用 PNG 格式图片以获得最佳效果

## 浏览器支持

- Chrome >= 80
- Firefox >= 75
- Safari >= 13
- Edge >= 80

## License

MIT License

## 作者

[BaBiQ888](https://github.com/BaBiQ888)

## 贡献

欢迎提交 Issue 和 Pull Request

## 项目结构 

```
src/
├── components/
├── hooks/
├── pages/
├── store/
├── App.jsx
├── main.jsx
```
