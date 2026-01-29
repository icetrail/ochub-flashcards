import { useState, useCallback } from 'react';
import type { Deck } from '../types';
import {
  getAllDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
} from '../services/deckService';
import { trackEvent, AnalyticsEvents } from '../services/analyticsService';

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>(() => getAllDecks());

  const refreshDecks = useCallback(() => {
    setDecks(getAllDecks());
  }, []);

  const getDeck = useCallback((id: string) => {
    return getDeckById(id);
  }, []);

  const addDeck = useCallback(
    (data: Pick<Deck, 'name' | 'description' | 'color'>) => {
      const newDeck = createDeck(data);
      trackEvent(AnalyticsEvents.DECK_CREATED, { deckId: newDeck.id });
      refreshDecks();
      return newDeck;
    },
    [refreshDecks]
  );

  const editDeck = useCallback(
    (id: string, data: Partial<Pick<Deck, 'name' | 'description' | 'color'>>) => {
      const updatedDeck = updateDeck(id, data);
      refreshDecks();
      return updatedDeck;
    },
    [refreshDecks]
  );

  const removeDeck = useCallback(
    (id: string) => {
      const result = deleteDeck(id);
      if (result) {
        trackEvent(AnalyticsEvents.DECK_DELETED, { deckId: id });
        refreshDecks();
      }
      return result;
    },
    [refreshDecks]
  );

  return {
    decks,
    refreshDecks,
    getDeck,
    addDeck,
    editDeck,
    removeDeck,
  };
}
