import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { WidgetLayout } from '../components/layout';
import { FlashcardViewer } from '../components/flashcard';
import { getRandomCard } from '../services/flashcardService';
import { trackEvent, AnalyticsEvents } from '../services/analyticsService';
import type { Flashcard } from '../types';

interface WidgetSearch {
  deckId?: string;
}

export const Route = createFileRoute('/widget')({
  component: WidgetPage,
  validateSearch: (search: Record<string, unknown>): WidgetSearch => {
    return {
      deckId: typeof search.deckId === 'string' ? search.deckId : undefined,
    };
  },
});

function WidgetPage() {
  const { deckId } = Route.useSearch();
  const [card] = useState<Flashcard | undefined>(() =>
    getRandomCard(deckId)
  );

  useEffect(() => {
    trackEvent(AnalyticsEvents.WIDGET_LOADED, { deckId: deckId || 'all' });
  }, [deckId]);

  const handleFlip = () => {
    if (card) {
      trackEvent(AnalyticsEvents.CARD_FLIPPED, { cardId: card.id });
    }
  };

  if (!card) {
    return (
      <WidgetLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">No flashcards available</p>
        </div>
      </WidgetLayout>
    );
  }

  return (
    <WidgetLayout>
      <FlashcardViewer card={card} onFlip={handleFlip} showHint={false} />
    </WidgetLayout>
  );
}
