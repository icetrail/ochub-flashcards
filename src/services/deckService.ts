import { v4 as uuidv4 } from 'uuid';
import type { Deck } from '../types';
import { getItem, setItem, StorageKeys } from './storage';
import { getCardsByDeckId, deleteCardsByDeckId } from './flashcardService';

export function getAllDecks(): Deck[] {
  return getItem<Deck[]>(StorageKeys.DECKS, []);
}

export function getDeckById(id: string): Deck | undefined {
  const decks = getAllDecks();
  return decks.find((deck) => deck.id === id);
}

export function createDeck(data: Pick<Deck, 'name' | 'description' | 'color'>): Deck {
  const now = new Date().toISOString();
  const newDeck: Deck = {
    id: uuidv4(),
    name: data.name,
    description: data.description,
    color: data.color,
    createdAt: now,
    updatedAt: now,
    cardCount: 0,
  };

  const decks = getAllDecks();
  decks.push(newDeck);
  setItem(StorageKeys.DECKS, decks);

  return newDeck;
}

export function updateDeck(
  id: string,
  data: Partial<Pick<Deck, 'name' | 'description' | 'color'>>
): Deck | undefined {
  const decks = getAllDecks();
  const index = decks.findIndex((deck) => deck.id === id);

  if (index === -1) {
    return undefined;
  }

  const updatedDeck: Deck = {
    ...decks[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  decks[index] = updatedDeck;
  setItem(StorageKeys.DECKS, decks);

  return updatedDeck;
}

export function deleteDeck(id: string): boolean {
  const decks = getAllDecks();
  const filteredDecks = decks.filter((deck) => deck.id !== id);

  if (filteredDecks.length === decks.length) {
    return false;
  }

  deleteCardsByDeckId(id);
  setItem(StorageKeys.DECKS, filteredDecks);

  return true;
}

export function updateDeckCardCount(deckId: string): void {
  const cards = getCardsByDeckId(deckId);
  const decks = getAllDecks();
  const index = decks.findIndex((deck) => deck.id === deckId);

  if (index !== -1) {
    decks[index].cardCount = cards.length;
    setItem(StorageKeys.DECKS, decks);
  }
}
