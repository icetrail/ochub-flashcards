import { useState, useEffect, useCallback } from 'react';
import type { Flashcard } from '../../types';
import { getRandomCard } from '../../services/flashcardService';
import { trackEvent, AnalyticsEvents } from '../../services/analyticsService';
import { FlashcardViewer } from './FlashcardViewer';

interface FlashcardWidgetProps {
  deckId?: string;
}

export function FlashcardWidget({ deckId }: FlashcardWidgetProps) {
  const [currentCard, setCurrentCard] = useState<Flashcard | undefined>(() =>
    getRandomCard(deckId)
  );

  useEffect(() => {
    setCurrentCard(getRandomCard(deckId));
    trackEvent(AnalyticsEvents.WIDGET_LOADED, { deckId: deckId || 'all' });
  }, [deckId]);

  const handleFlip = useCallback(() => {
    if (currentCard) {
      trackEvent(AnalyticsEvents.CARD_FLIPPED, { cardId: currentCard.id });
    }
  }, [currentCard]);

  const handleNext = useCallback(() => {
    const nextCard = getRandomCard(deckId);
    setCurrentCard(nextCard);
    if (nextCard) {
      trackEvent(AnalyticsEvents.CARD_VIEWED, { cardId: nextCard.id });
    }
  }, [deckId]);

  if (!currentCard) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto"
          >
            <path d="M12 3v18" />
            <rect x="4" y="8" width="16" height="8" rx="1" />
          </svg>
        </div>
        <p className="text-gray-500">No flashcards available</p>
        <p className="text-sm text-gray-400">Create some cards to practice</p>
      </div>
    );
  }

  return (
    <FlashcardViewer
      card={currentCard}
      onFlip={handleFlip}
      onNext={handleNext}
      showNavigation
    />
  );
}
