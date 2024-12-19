import { useState, useEffect } from 'react';

function ApiStatus() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
        setStatus(response.ok ? 'online' : 'offline');
      } catch {
        setStatus('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // 每30秒检查一次
    return () => clearInterval(interval);
  }, []);

  if (status === 'checking' || status === 'online') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-50 text-red-700 px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-2">
        <span className="material-icons text-sm">error</span>
        <span>服务器连接失败</span>
      </div>
    </div>
  );
}

export default ApiStatus; 