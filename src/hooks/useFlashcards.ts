import { useState, useCallback } from 'react';
import type { Flashcard } from '../types';
import {
  getCardsByDeckId,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getRandomCard,
  incrementReviewCount,
} from '../services/flashcardService';
import { updateDeckCardCount } from '../services/deckService';
import { trackEvent, AnalyticsEvents } from '../services/analyticsService';

export function useFlashcards(deckId?: string) {
  const [cards, setCards] = useState<Flashcard[]>(() =>
    deckId ? getCardsByDeckId(deckId) : []
  );

  const refreshCards = useCallback(() => {
    if (deckId) {
      setCards(getCardsByDeckId(deckId));
    }
  }, [deckId]);

  const getCard = useCallback((id: string) => {
    return getCardById(id);
  }, []);

  const addCard = useCallback(
    (data: Pick<Flashcard, 'front' | 'back'>) => {
      if (!deckId) return undefined;

      const newCard = createCard({ ...data, deckId });
      updateDeckCardCount(deckId);
      trackEvent(AnalyticsEvents.CARD_CREATED, {
        cardId: newCard.id,
        deckId,
      });
      refreshCards();
      return newCard;
    },
    [deckId, refreshCards]
  );

  const editCard = useCallback(
    (id: string, data: Partial<Pick<Flashcard, 'front' | 'back'>>) => {
      const updatedCard = updateCard(id, data);
      refreshCards();
      return updatedCard;
    },
    [refreshCards]
  );

  const removeCard = useCallback(
    (id: string) => {
      const card = getCardById(id);
      const result = deleteCard(id);
      if (result && card) {
        updateDeckCardCount(card.deckId);
        trackEvent(AnalyticsEvents.CARD_DELETED, {
          cardId: id,
          deckId: card.deckId,
        });
        refreshCards();
      }
      return result;
    },
    [refreshCards]
  );

  const getRandom = useCallback((filterDeckId?: string) => {
    return getRandomCard(filterDeckId);
  }, []);

  const trackFlip = useCallback((id: string) => {
    incrementReviewCount(id);
    trackEvent(AnalyticsEvents.CARD_FLIPPED, { cardId: id });
  }, []);

  return {
    cards,
    refreshCards,
    getCard,
    addCard,
    editCard,
    removeCard,
    getRandom,
    trackFlip,
  };
}
