function SuccessMessage({ message, onClose }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="material-icons text-green-400">check_circle</span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex text-green-500 hover:text-green-600"
            >
              <span className="material-icons text-sm">close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuccessMessage; 