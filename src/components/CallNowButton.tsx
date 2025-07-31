import { useState } from 'react';
import { PhoneIcon } from '@heroicons/react/24/solid';

interface CallNowButtonProps {
  position?: 'top-right' | 'bottom-right';
}

export default function CallNowButton({ position = 'bottom-right' }: CallNowButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => setIsTooltipVisible(true);
  const handleMouseLeave = () => setIsTooltipVisible(false);

  return (
    <div
      className={`fixed ${
        position === 'top-right'
          ? 'top-4 right-4'
          : 'bottom-4 right-4'
      } z-50`}
    >
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isTooltipVisible && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm">
            Voice Agent will assist you shortly
          </div>
        )}
        <button
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          onClick={() => {
            // TODO: Implement call functionality
          }}
        >
          <PhoneIcon className="h-5 w-5 mr-2" />
          Call Now
        </button>
      </div>
    </div>
  );
}
