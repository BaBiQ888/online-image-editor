import { useEffect, useRef, useState } from 'react';

const COLOR_STYLES = {
  blue: 'bg-blue-50 text-blue-500',
  purple: 'bg-purple-50 text-purple-500',
  green: 'bg-green-50 text-green-500',
  orange: 'bg-orange-50 text-orange-500',
  pink: 'bg-pink-50 text-pink-500',
  indigo: 'bg-indigo-50 text-indigo-500',
};

function FeatureCard({ icon, title, description, color = 'blue', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-700 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-lg ${COLOR_STYLES[color]} flex items-center justify-center mb-4`}>
        <span className="material-icons text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard; 