function StepIndicator({ currentStep }) {
  const steps = [
    { number: 1, label: '上传图片' },
    { number: 2, label: '调整效果' },
    { number: 3, label: '下载结果' },
  ];

  return (
    <div className="flex items-center space-x-4">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step.number <= currentStep
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-600'
              }`}
          >
            {step.number}
          </div>
          <span
            className={`ml-2 ${step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <span className="material-icons text-gray-300 ml-4">arrow_forward</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default StepIndicator; 