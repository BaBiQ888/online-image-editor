import { useEffect, useRef, useState, useCallback } from 'react';
import useImageStore from '../../store/imageStore';

function ImageCanvas({ image, tool, onUpdate }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const { background } = useImageStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    // Clear canvas with background
    if (background.type === 'transparent') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else if (background.type === 'color') {
      ctx.fillStyle = background.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (background.type === 'image') {
      const bgImage = new Image();
      bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
      };
      bgImage.src = background.value;
      return;
    }

    ctx.drawImage(image, 0, 0);
    setContext(ctx);
  }, [image, background]);

  const startDrawing = useCallback(
    (e) => {
      if (!context || tool === 'none') return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setIsDrawing(true);
      context.beginPath();
      context.moveTo(x, y);

      if (tool === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
        context.lineWidth = 20;
      } else if (tool === 'smooth') {
        context.globalCompositeOperation = 'source-over';
        context.lineWidth = 10;
        context.filter = 'blur(4px)';
      }
    },
    [context, tool]
  );

  const draw = useCallback(
    (e) => {
      if (!isDrawing || !context || tool === 'none') return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      context.lineTo(x, y);
      context.stroke();
    },
    [isDrawing, context, tool]
  );

  const stopDrawing = useCallback(() => {
    if (!context || !isDrawing) return;

    context.closePath();
    setIsDrawing(false);
    context.globalCompositeOperation = 'source-over';
    context.filter = 'none';

    // Notify parent component of updates
    const imageData = canvasRef.current.toDataURL('image/png');
    onUpdate(imageData);
  }, [context, isDrawing, onUpdate]);

  return (
    <canvas
      ref={canvasRef}
      className="max-w-full h-auto border rounded-lg cursor-crosshair"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
    />
  );
}

export default ImageCanvas;
