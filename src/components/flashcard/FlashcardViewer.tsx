import { useState } from 'react';
import type { Flashcard } from '../../types';

interface FlashcardViewerProps {
  card: Flashcard;
  onFlip?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  showHint?: boolean;
}

export function FlashcardViewer({
  card,
  onFlip,
  onNext,
  showNavigation = false,
  showHint = true,
}: FlashcardViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && onFlip) {
      onFlip();
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div
        className="flex-1 relative perspective-1000 cursor-pointer"
        onClick={handleFlip}
      >
        <div
          className={`absolute inset-0 preserve-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''
            }`}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
            <p className="text-xl text-center text-gray-900 font-medium">{card.front}</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-50 rounded-xl shadow-lg p-6 flex items-center justify-center">
            <p className="text-xl text-center text-gray-900">{card.back}</p>
          </div>
        </div>
      </div>

      {showHint && (
        <p className="text-center text-sm text-gray-400 mt-4">
          Tap card to flip
        </p>
      )}

      {showNavigation && onNext && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Card
          </button>
        </div>
      )}
    </div>
  );
}
