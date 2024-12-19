import { useEffect, useRef, useState } from 'react';

function StepGuide({ steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 自动切换活跃步骤
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isVisible, steps.length]);

  return (
    <div className="bg-white py-16 sm:py-24" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          简单四步，轻松搞定
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          无需复杂操作，人人都能轻松上手
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5">
                  <div className={`h-full transition-all duration-1000 ${activeStep >= index ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rotate-45 transition-all duration-500 ${activeStep > index ? 'border-t-2 border-r-2 border-primary-500' : 'border-t-2 border-r-2 border-gray-200'
                    }`} />
                </div>
              )}
              {/* 步骤卡片 */}
              <div
                className={`bg-white rounded-xl p-6 text-center transition-all duration-300 ${activeStep === index
                    ? 'shadow-lg scale-105'
                    : 'hover:shadow-md hover:scale-102'
                  }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${activeStep === index ? 'bg-primary-500 text-white' : 'bg-primary-50 text-primary-600'
                  }`}>
                  <span className="material-icons text-2xl">{step.icon}</span>
                </div>
                <div className={`text-sm font-medium mb-2 transition-colors duration-300 ${activeStep === index ? 'text-primary-500' : 'text-gray-400'
                  }`}>
                  {step.number}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StepGuide; 