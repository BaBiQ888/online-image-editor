function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="material-icons text-red-400">error_outline</span>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">处理出错了</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
              >
                <span className="material-icons text-sm mr-1">refresh</span>
                重试
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage; 